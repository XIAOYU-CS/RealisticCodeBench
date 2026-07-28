import fs from 'fs'

/**
 * Modifies a specific line in the given file.
 *
 * @param {string} filePath - The path of the file to be modified.
 * @param {number} lineNumber - The line number to be modified (1-based index).
 * @param {string} newValue - The new value to update the line with.
 * @returns {void}
 * @throws {Error} - If an invalid line number is specified or an I/O error occurs.
 */
function modifyLineInFile(filePath, lineNumber, newValue) {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    if (lineNumber < 1 || lineNumber > lines.length) {
        throw new Error(`Invalid line number: ${lineNumber}`);
    }

    lines[lineNumber - 1] = newValue;
    fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf-8');
}
