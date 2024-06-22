/**
 *  Automated script that ensures consistent versioning across interdependent packages in a monorepo.
 *
 *  This script reads the current version of each package and updates any other packages that reference
 *  it in their `peerDependencies` to maintain version synchronization.
 *
 *  @example: $ node ./sync-peer-deps.mjs [--dry-run]
 *
 *  TODO: remove this script if one day this feature is supported by `nx release` directly
 *  @see https://github.com/nrwl/nx/issues/22776
 *  @see https://github.com/nrwl/nx/discussions/23388
 */

import chalk from 'chalk';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const { yellow, blue, red, green, gray, white, bgBlue, bgWhite } = chalk;

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = resolve(__dirname, '..');

const dryRun = (process.argv[2] === '--dry-run');

const execCommand = (command, args) => {
    console.log(`\n${command} ${args.join(' ')}`);
    if (!dryRun) {
        const result = spawnSync(command, args, { stdio: 'inherit' });
        if (result.error) {
            throw result.error;
        }
        if (result.status !== 0) {
            throw new Error(`Command failed with exit code ${result.status}`);
        }
    }
};

const getWorkspaces = () => {
    const rootPackageJson = JSON.parse(readFileSync(resolve(rootPath, 'package.json'), 'utf8'));
    if (!rootPackageJson.workspaces) {
        console.error(red('No workspaces found in package.json'));
    }
    return (rootPackageJson.workspaces || []).map(workspace => ({
        packageJsonPath: resolve(rootPath, workspace, 'package.json'),
        packageJson: JSON.parse(readFileSync(resolve(rootPath, workspace, 'package.json'), 'utf8'))
    }));
};

(() => {
    console.log(`\n${bgBlue(' > ')} Synchronizing peer dependencies`);
    let changesDetected = false;
    const workspaces = getWorkspaces();
    workspaces.forEach(workspace => {
        workspaces.forEach(workspace2 => {
            const peerDependencies = workspace2.packageJson.peerDependencies || {};
            if (Object.hasOwn(peerDependencies, workspace.packageJson.name)) {
                const version = peerDependencies[workspace.packageJson.name];
                if (!version.includes(workspace.packageJson.version)) {
                    changesDetected = true;

                    const versionRange = version.match(/(^[^\d]*)\d.*/)[1];
                    const newVersion = `${versionRange}${workspace.packageJson.version}`;

                    console.log(blue.bold(`\n[${workspace2.packageJson.name}]`));
                    console.log(`\n${bgWhite(' > ')} ${white('UPDATE')} ${workspace2.packageJsonPath}${dryRun ? yellow(' [dry-run]') : ''}\n`);
                    console.log(gray('  "peerDependencies": {'));
                    console.log(red(`-    "${workspace.packageJson.name}": "${version}"`));
                    console.log(green(`+    "${workspace.packageJson.name}": "${newVersion}"`));
                    console.log(gray('  }'));
                    if (!dryRun) {
                        workspace2.packageJson.peerDependencies[workspace.packageJson.name] = newVersion;
                        writeFileSync(workspace2.packageJsonPath, JSON.stringify(workspace2.packageJson, null, 4), { encoding: 'utf8' });
                    }

                    console.log(`\n${bgWhite(' > ')} Staging changed files with git${dryRun ? yellow(' [dry-run]') : ''}`);
                    execCommand('git', ['add', workspace2.packageJsonPath]);

                    console.log(`\n${bgWhite(' > ')} Committing changes with git${dryRun ? yellow(' [dry-run]') : ''}`);
                    execCommand('git', ['commit', '--message', `deps(${workspace.packageJson.name}): upgrade to v${workspace.packageJson.version}`]);
                }
            }
        });
    });

    if (changesDetected) {
        console.log(`\n${bgWhite(' > ')} Pushing to git remote${dryRun ? yellow(' [dry-run]') : ''}`);
        execCommand('git', ['push', '--follow-tags', '--no-verify', '--atomic']);
    } else {
        console.log('\nNo changes were needed, versions already in sync.');
    }

    if (dryRun) {
        console.log(yellow('\nNOTE: The "--dry-run" flag means no changes were made.\n'));
    }
})();
