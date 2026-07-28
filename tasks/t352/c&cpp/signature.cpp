
#include <map>
#include <string>
#include <variant>
#include <vector>

using ColumnValue = std::variant<std::string, std::vector<std::string>, int>;

/**
 * @brief Parses CSV data and returns detailed information about each column,
 * including column name, inferred data type, and sample values.
 * 
 * Supports standard CSV formatting:
 * - Fields may be quoted with double quotes
 * - Commas within quoted fields are preserved
 * - Double double-quotes inside quotes are treated as escaped quote (e.g., "a""b" → a"b)
 * 
 * @param csv_data The raw CSV string to parse.
 * @return std::vector<std::map<std::string, ColumnValue>> An array of column detail objects, each containing:
 *     - columnName (std::string): The name of the column
 *     - dataType (std::string): One of 'string', 'number', 'boolean', 'mixed', 'empty'
 *     - sampleValues (std::vector<std::string>): Sample non-empty values from the column (up to 5)
 *     - totalCount (int): Total number of rows (excluding header)
 *     - emptyCount (int): Number of empty/missing values
 *     - nonEmptyCount (int): Number of non-empty values
 */
std::vector<std::map<std::string, ColumnValue>> get_column_details(const std::string& csv_data);
