const fs = require('fs');

async function loadRegexMappingsFromFile(mappingFilePath) {
    /**
     * Read a mapping file and return an array of tuples with compiled regex and replacement strings.
     *
     * @param {string} mappingFilePath - Path to the file containing regex mappings.
     * @returns {Array} - Each tuple contains a compiled regex object and a corresponding replacement string.
     * @throws {Error} - Throws an error if the mapping file does not exist or if any line in the file does not contain exactly one comma.
     *
     * Example of file format:
     * 'old_pattern1','new_word1'
     * 'old_pattern2','new_word2'
     */
    let data;
    try {
        data = await fs.promises.readFile(mappingFilePath, 'utf8');
    } catch (error) {
        throw new Error(`Unable to find the specified file: ${mappingFilePath}`);
    }

    const lines = data.split(/\r?\n/);
    if (lines[lines.length - 1] === '') {
        lines.pop();
    }

    const mappings = [];
    for (const line of lines) {
        const commaIndex = line.indexOf(',');
        if (commaIndex === -1) {
            throw new Error("Each line must contain exactly one comma separating the pattern and the replacement.");
        }

        const oldPattern = line.slice(0, commaIndex).trim().replace(/^'|'$/g, '');
        const newWord = line.slice(commaIndex + 1).trim().replace(/^'|'$/g, '');
        mappings.push([new RegExp(oldPattern), newWord]);
    }

    return mappings;
}

