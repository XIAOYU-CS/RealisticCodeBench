import fs from 'fs'

/**
 * Reads data from a file and returns an array of parsed values.
 *
 * @param {string} path - The path to the file to read.
 * @returns {Array} An array containing integers, floats, and strings parsed from the file.
 * @throws {Error} Throws an error if the file cannot be read.
 */
function readDataFromFile(path) {
    const dataList = [];
    try {
        const data = fs.readFileSync(path, 'utf8');
        const lines = data === '' ? [] : data.split(/\r?\n/);
        if (/\r?\n$/.test(data)) {
            lines.pop();
        }

        for (let line of lines) {
            line = line.trim();

            // Try to parse as an integer
            if (/^[+-]?\d+$/.test(line)) {
                dataList.push(Number.parseInt(line, 10));
                continue; // Go to the next line
            }

            // Try to parse as a floating-point number
            if (/^[+-]?(?:\d+\.\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(line) || /^[+-]?\d+[eE][+-]?\d+$/.test(line)) {
                dataList.push(Number.parseFloat(line));
                continue; // Go to the next line
            }

            // If it's not an integer or float, treat it as a string
            dataList.push(line);
        }
    } catch (e) {
        console.error(e);
        throw new Error(`Error reading file: ${e.message}`);
    }

    return dataList;
}
