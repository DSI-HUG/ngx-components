/**
 *  TODO: this whole patch can be removed when https://github.com/nrwl/nx/issues/26492 is fixed
 */

const { readFileSync, writeFileSync, existsSync } = require('fs-extra');
const { green, red, gray } = require('@colors/colors/safe');
const { dirname, join } = require('path');

try {
    const filePath = join(dirname(require.resolve('nx')), '../src/command-line/release/utils/git.js');
    if (existsSync(filePath)) {
        let data = readFileSync(filePath, { encoding: 'utf8' });

        const toReplace = 'return (0, exec_command_1.execCommand)(\'git\', commandArgs);';
        if (data.includes(toReplace)) {
            data = data.replaceAll(toReplace, 'return (0, exec_command_1.execCommand)(\'git\', commandArgs, { cwd: \'../../\' });');
            writeFileSync(filePath, data, { encoding: 'utf8' });
            console.log(green('success'), 'nx patched.');
        } else {
            console.log(green('success'), 'nx already patched.');
        }
    } else {
        console.error(red('error'), 'cannot patch nx.');
        console.error(gray(`"${filePath}" not found`));
    }
} catch (error) {
    // Swallow exception in case nx was not found
    console.error(error);
}
