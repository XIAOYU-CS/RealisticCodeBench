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
    keyProcessor: (key: string) => T = (x: string) => x as unknown as T,
    valueProcessor: (value: string) => U = (x: string) => x as unknown as U,
    separator: string | null = null
): Array<[T, U]> {}