/**
 * Adds padding characters to a multi-line string, supporting multiple directions and custom padding content
 *
 * @param {string} string - Input multi-line string
 * @param {number} [n=4] - Padding quantity (padding length for each side)
 * @param {string} [char=' '] - Padding character (space by default), can use a single character or string
 * @param {'left'|'right'|'both'} [side='left'] - Padding direction
 * @returns {string} The padded multi-line string
 */
function padString(string, n = 4, char = ' ', side = 'left') {
    if (typeof string !== 'string') {
        throw new TypeError(`Expected string type, received ${typeof string}`);
    }

    if (!string || n <= 0) {
        return string;
    }

    if (!char) {
        char = ' ';
    }

    const charLen = char.length;
    const repeat = Math.floor(n / charLen) + (n % charLen ? 1 : 0);
    const padding = char.repeat(repeat).substring(0, n); // Ensure padding length is exactly n

    const endsWithNewline = string.endsWith('\n');
    const lines = string.split(/\r?\n/);

    const processedLines = lines.map(line => {
        switch (side) {
            case 'left':
                return padding + line;
            case 'right':
                return line + padding;
            case 'both':
                return padding + line + padding;
            default:
                throw new Error(`Unsupported padding direction: ${side}, allowed values: 'left'/'right'/'both'`);
        }
    });

    const result = processedLines.join('\n');
    return result + (endsWithNewline ? '\n' : '');
}