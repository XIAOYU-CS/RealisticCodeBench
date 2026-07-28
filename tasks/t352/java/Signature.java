/**
 * Parses CSV data and returns detailed information about each column,
 * including column name, inferred data type, and sample values.
 *
 * Supports standard CSV formatting:
 * - Fields may be quoted with double quotes
 * - Commas within quoted fields are preserved
 * - Double double-quotes inside quotes are treated as escaped quote (e.g., "a""b" → a"b)
 *
 * @param csvData The raw CSV string to parse.
 * @return An array of column detail objects, each containing:
 *         - columnName (String): The name of the column
 *         - dataType (String): One of "string", "number", "boolean", "mixed", "empty"
 *         - sampleValues (List<String>): Sample non-empty values from the column (up to 5)
 *         - totalCount (int): Total number of rows (excluding header)
 *         - emptyCount (int): Number of empty/missing values
 *         - nonEmptyCount (int): Number of non-empty values
 */
public static List<Map<String, Object>> getColumnDetails(String csvData) {}