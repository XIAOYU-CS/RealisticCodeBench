function prependToEachLine(filePath: string, prefix: string) {
    /**
     * Prepends the specified string to the beginning of each line of the file.
     *
     * @param filePath - Path to the file whose lines will be modified.
     * @param prefix - String to prepend to the beginning of each line.
     */
    const fs = require('fs');
    const data = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(filePath, data.split('\n').map((line: string) => prefix + line).join('\n'), 'utf8');
}
