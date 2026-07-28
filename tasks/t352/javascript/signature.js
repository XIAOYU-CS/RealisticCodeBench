/**
 * Parses CSV data and returns detailed information about each column,
 * including column name, inferred data type, and sample values.
 *
 * Supports standard CSV formatting:
 * - Fields may be quoted with double quotes
 * - Commas within quoted fields are preserved
 * - Double double-quotes inside quotes are treated as escaped quote (e.g., "a""b" → a"b)
 *
 * @param {string} csvData - The raw CSV string to parse.
 * @returns {Array<{ columnName: string, dataType: 'string' | 'number' | 'boolean' | 'mixed' | 'empty', sampleValues: string[], totalCount: number, emptyCount: number }>}
 *   An array of column detail objects.
 */
function getColumnDetails(csvData) {}