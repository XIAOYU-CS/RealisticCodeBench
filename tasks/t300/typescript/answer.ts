/**
 * Parses a key-value formatted file, converting each line into an array of [processed key, processed value]
 * and returning them as a list. Empty lines are skipped.
 *
 * @template T - The type of the processed key
 * @template U - The type of the processed value
 * @param {string} filePath - Path to the file to be parsed
 * @param {(key: string) => T} keyProcessor - Function used to process keys, returns original key by default
 * @param {(value: string) => U} valueProcessor - Function used to process values, returns original value by default
 * @param {string | null} separator - Delimiter for key-value pairs. Uses whitespace when null (splits into max two parts)
 * @returns {Array<[T, U]>} List containing arrays of [processed key, processed value]
 */
function parseKeyValueFormatDataFile<T = string, U = string>(
    filePath: string,
    keyProcessor: ((key: string) => T) | null = (x: string) => x as unknown as T,
    valueProcessor: ((value: string) => U) | null = (x: string) => x as unknown as U,
    separator: string | null = null
): Array<[T, U]> {
    if (keyProcessor == null) {
        keyProcessor = (x: string) => x as unknown as T;
    }
    if (valueProcessor == null) {
        valueProcessor = (x: string) => x as unknown as U;
    }

    const results: Array<[T, U]> = [];
    const content = require('fs').readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const lineNumber = i + 1; // Line numbers start at 1
        const originalLine = lines[i].trim();

        if (!originalLine) {
            continue; // Skip empty lines
        }

        let parts: string[];
        if (separator === null) {
            const match = originalLine.match(/^(\S+)\s+([\s\S]*)$/);
            parts = match ? [match[1], match[2]] : [originalLine];
        } else {
            if (separator === '') {
                throw new Error('empty separator');
            }
            const separatorIndex = originalLine.indexOf(separator);
            parts = separatorIndex >= 0
                ? [originalLine.slice(0, separatorIndex), originalLine.slice(separatorIndex + separator.length)]
                : [originalLine];
        }

        if (parts.length !== 2) {
            throw new Error(`Line ${lineNumber} format error: must contain key and value (content: ${originalLine})`);
        }

        try {
            const key = keyProcessor(parts[0]);
            const value = valueProcessor(parts[1]);
            results.push([key, value]);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            throw new Error(`Line ${lineNumber} processing failed: ${errorMessage} (content: ${originalLine})`);
        }
    }

    return results;
}
