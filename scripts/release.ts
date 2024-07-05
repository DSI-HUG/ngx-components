/* eslint-disable @typescript-eslint/naming-convention, no-loops/no-loops, camelcase */

import chalk from 'chalk';
import { spawnSync } from 'node:child_process';
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { releaseChangelog, releasePublish, releaseVersion } from 'nx/release';
import { PublishOptions } from 'nx/src/command-line/release/command-object';
import { createProjectGraphAsync, readProjectsConfigurationFromProjectGraph } from 'nx/src/project-graph/project-graph';
import { PackageJson } from 'nx/src/utils/package-json';
import { workspaceRoot } from 'nx/src/utils/workspace-root';
import * as yargs from 'yargs';

const { yellow, blue, red, green, gray, white, bgBlue } = chalk;

void (async (): Promise<void> => {
    const options = await yargs
        .version(false)
        .option('projects', {
            description: 'Projects filter to use for the release script',
            type: 'array',
            string: true,
            default: []
        })
        .option('dry-run', {
            description: 'Whether or not to perform a dry-run of the release process, defaults to false',
            type: 'boolean',
            default: false
        })
        .option('verbose', {
            description: 'Whether or not to enable verbose logging, defaults to false',
            type: 'boolean',
            default: false
        })
        .parseAsync();

    /**
     *   1. Resolve new project version
     *   2. Update `projects/<project_name>/package.json` with new version
     *   3. Update npm lock file
     *   4. Stage changed files with git
     */
    const { workspaceVersion, projectsVersionData } = await releaseVersion({
        projects: options.projects,
        stageChanges: true,
        gitCommit: false,
        dryRun: options.dryRun,
        verbose: options.verbose
    });

    /**
     *   5. Determine affected projects and exit if none
     */
    const projectsToRelease = Object.keys(projectsVersionData).filter(key => {
        const { newVersion, currentVersion } = projectsVersionData[key];
        return (newVersion && (newVersion !== currentVersion));
    });
    if (projectsToRelease.length === 0) {
        console.log('No affected projects found to be published');
        return process.exit(0);
    }

    /**
     *   6. Update `projects/<project_name>/CHANGELOG.md`
     *   7. Stage changed files with git
     *   8. Commit all previously staged files in git
     *        chore(release): publish [skip ci]
     *        - project: @hug/ngx-xyz 1.2.3
     *   9. Tag commit with git
     *        @hug/ngx-xyz@1.2.3
     *  10. Push to git remote
     *  11. Create GitHub release
     */
    await releaseChangelog({
        projects: options.projects,
        version: workspaceVersion,
        versionData: projectsVersionData,
        stageChanges: true,
        gitCommit: true,
        gitCommitMessage: 'chore(release): publish [skip ci]',
        gitTag: true,
        dryRun: options.dryRun,
        verbose: options.verbose
    });

    /**
     *  Ensures consistent versioning across interdependent packages in the monorepo.
     *
     *  It reads the current version of each package and updates any other packages that reference
     *  it in their `peerDependencies` to maintain version synchronization.
     *
     *  TODO: remove this script if one day this feature is supported by `nx release` directly
     *  @see https://github.com/nrwl/nx/issues/22776
     *  @see https://github.com/nrwl/nx/discussions/23388
     *
     *  12. Synchronize interdependencies
     *   - Update project's package.json file
     *   - Update npm lock file
     *   - Stage changed files with git
     *   - Commit all previously staged files in git
     *       deps(@hug/ngx-xyz): upgrade to v1.2.3
     *       [skip ci]
     *  13. Push to git remote
     */
    const exec = (message: string, cmd: string, args: string[]): void => {
        console.log(message);
        if (options.verbose) {
            console.log(`\n${cmd} ${args.join(' ')}`);
        }
        if (!options.dryRun) {
            const result = spawnSync(cmd, args, { stdio: 'inherit', cwd: workspaceRoot });
            if (result.error) {
                throw result.error;
            }
            if (result.status !== 0) {
                throw new Error(`Command failed with exit code ${result.status}`);
            }
        }
    };
    const projectGraph = await createProjectGraphAsync({ exitOnError: true });
    const { projects } = readProjectsConfigurationFromProjectGraph(projectGraph);
    const workspaces = Object.values(projects).map(project => ({
        packageJsonPath: join(project.root, 'package.json'),
        packageJson: JSON.parse(readFileSync(join(workspaceRoot, project.root, 'package.json'), 'utf8')) as PackageJson
    }));
    let packageJsonFiles: string[] = [];
    let changesDetected = false;

    console.log(`\n${bgBlue(' HUG ')}  ${blue('Synchronizing peer interdependencies')}${options.dryRun ? yellow(' [dry-run]') : ''}`);
    workspaces.forEach(workspace => {
        workspaces.forEach(workspace2 => {
            const peerDependencies = workspace2.packageJson.peerDependencies ?? {};
            if (Object.prototype.hasOwnProperty.call(peerDependencies, workspace.packageJson.name)) {
                const version = peerDependencies[workspace.packageJson.name];
                if (!version.includes(workspace.packageJson.version)) {
                    changesDetected = true;

                    const versionRange = version.match(/(^[^\d]*)\d.*/)?.[1] ?? '';
                    const newVersion = `${versionRange}${workspace.packageJson.version}`;

                    if (!packageJsonFiles.length) {
                        console.log(`\n- ${blue(workspace.packageJson.name)}`);
                    }

                    console.log(`\n${white('UPDATE')} ${workspace2.packageJsonPath}${options.dryRun ? yellow(' [dry-run]') : ''}\n`);
                    console.log(gray('  "peerDependencies": {'));
                    console.log(red(`-    "${workspace.packageJson.name}": "${version}"`));
                    console.log(green(`+    "${workspace.packageJson.name}": "${newVersion}"`));
                    console.log(gray('  }'));
                    if (!options.dryRun) {
                        peerDependencies[workspace.packageJson.name] = newVersion;
                        workspace2.packageJson.peerDependencies = peerDependencies;
                        writeFileSync(join(workspaceRoot, workspace2.packageJsonPath), JSON.stringify(workspace2.packageJson, null, 4), { encoding: 'utf8' });
                    }

                    packageJsonFiles.push(workspace2.packageJsonPath);
                }
            }
        });

        if (packageJsonFiles.length) {
            exec(
                `\n${bgBlue(' HUG ')}  ${blue('Updating npm lock file')}${options.dryRun ? yellow(' [dry-run]') : ''}\n`,
                'npm', ['install']
            );
            exec(
                `\n${bgBlue(' HUG ')}  ${blue('Staging changed files with git')}${options.dryRun ? yellow(' [dry-run]') : ''}\n`,
                'git', ['add', 'package-lock.json', ...packageJsonFiles]
            );
            exec(
                `\n${bgBlue(' HUG ')}  ${blue('Comitting changes with git')}${options.dryRun ? yellow(' [dry-run]') : ''}\n`,
                'git', ['commit', '--message', `deps(${workspace.packageJson.name}): upgrade to v${workspace.packageJson.version}`, '--message', '[skip ci]']
            );
            packageJsonFiles = [];
        }
    });
    if (changesDetected) {
        exec(
            `\n${bgBlue(' HUG ')}  ${blue('Pushing to git remote')}${options.dryRun ? yellow(' [dry-run]') : ''}\n`,
            'git', ['push', '--follow-tags', '--no-verify', '--atomic']
        );
    } else {
        console.log('\nNo changes were needed, versions already in sync.');
    }

    /**
     *  Currently `nx release` publishes packages from their source directory by default.
     *
     *  So we need to make sure `dist` are in sync and published instead.
     *
     *  TODO: remove this script if one day this feature is supported by `nx release` directly
     *  @see https://github.com/nrwl/nx/issues/21855#issuecomment-1977360480
     *
     *   14. Update project(s) `package.json` and `CHANGELOG.md` in dist
     */
    console.log(`\n${bgBlue(' HUG ')}  ${blue('Synchronizing dist packages')}${options.dryRun ? yellow(' [dry-run]') : ''}`);
    projectsToRelease.forEach(project => {
        const projectRoot = projects[project].root;
        const projectName = projectRoot.substring('projects/'.length);
        const projectNewVersion = projectsVersionData[project].newVersion ?? '';
        const distPackageJsonPath = join('dist', projectName, 'package.json');
        const distChangelogPath = join('dist', projectName, 'CHANGELOG.md');

        console.log(`\n${blue(projects[project].name ?? '')} New version ${projectNewVersion} written to ${distPackageJsonPath}`);
        if (!options.dryRun) {
            const distPackageJson = JSON.parse(readFileSync(join(workspaceRoot, projectRoot, 'package.json'), 'utf8')) as PackageJson;
            distPackageJson.version = projectNewVersion;
            writeFileSync(join(workspaceRoot, distPackageJsonPath), JSON.stringify(distPackageJson, null, 4), { encoding: 'utf8' });
        }

        console.log(`${blue(projects[project].name ?? '')} Changelog updated in ${distChangelogPath}`);
        if (!options.dryRun) {
            copyFileSync(join(workspaceRoot, projectRoot, 'CHANGELOG.md'), join(workspaceRoot, distChangelogPath));
        }
    });

    /**
     *  Currently `nx release` does not allow to easily change the folder to be published.
     *
     *  `nx.json#targetDefaults.nx-release-publish.options.packageRoot` could be used but can only interpolate:
     *      - {projectName}: which resolved to '@hug/ngx-xyz' (ie. package.json#name)
     *      - {projectRoot}: which resolved to 'projects/xyz'
     *  And what we need is actually `xyz` because Angular generates projects in `dist/xyz`.
     *  So to make it work, we use the hidden option (__overrides_unparsed__) and publish each project individually.
     *
     *   15. Publish to npm
     */
    let processStatus = 0;
    if (!options.dryRun) {
        for (const project of projectsToRelease) {
            const projectName = projects[project].root.substring('projects/'.length);
            const publishStatus = await releasePublish({
                __overrides_unparsed__: `--packageRoot=./dist/${projectName}`,
                projects: [project],
                dryRun: options.dryRun,
                verbose: options.verbose
            } as PublishOptions);
            if (publishStatus !== 0) {
                processStatus = publishStatus;
            }
        }
    }

    return process.exit(processStatus);
})();
