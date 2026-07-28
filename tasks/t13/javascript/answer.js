const fs = require('fs');

/**
 * Compare the contents of two files and print the differences in unified diff format.
 *
 * @param {string} file1Path - Path to the first file.
 * @param {string} file2Path - Path to the second file.
 * @returns {Array<string>} A list containing the lines of differences, if any.
 * @throws {Error} If either file does not exist or there is an error reading the files.
 */
function compareFiles(file1Path, file2Path) {
    try {
        const file1Content = fs.readFileSync(file1Path, 'utf8');
        const file2Content = fs.readFileSync(file2Path, 'utf8');

        if (file1Content === file2Content) {
            return [];
        }

        const diffLines = [`--- ${file1Path}\n`, `+++ ${file2Path}\n`, `- ${file1Content}`, `+ ${file2Content}`];

        diffLines.forEach(line => process.stdout.write(line));

        return diffLines;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('One of the files was not found.');
        }
        throw new Error(`Error reading files: ${error.message}`);
    }
}
