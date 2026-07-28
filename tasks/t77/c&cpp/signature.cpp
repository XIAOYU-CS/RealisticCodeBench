struct VarType;

/**
 * Handle nested data structures (e.g., dictionaries, lists, and enumerations),
 * decode bytes to UTF-8 strings, and convert numbers to integers or floating-point numbers.
 *
 * @param data The input data object.
 * @return The processed data object after conversion.
 */
VarType handle_nested_data(const VarType& data);
