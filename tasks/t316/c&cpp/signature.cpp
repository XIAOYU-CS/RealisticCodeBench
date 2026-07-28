/**
 * @brief Sort a list of dictionaries by multiple fields with priority and handle missing fields.
 * 
 * @param dict_list List of dictionaries to be sorted
 * @param sort_fields List of tuples (field_name, ascending) for sorting
 *                    field_name (str): Name of the field to sort by
 *                    ascending (bool): True for ascending order, False for descending
 * @param missing_strategy Strategy for handling missing fields
 *                         'default' - Use default_value
 *                         'first' - Missing fields come first
 *                         'last' - Missing fields come last
 * @param default_value Default value when missing_strategy is 'default'
 * @return std::vector<std::unordered_map<std::string, std::any>> Sorted list of dictionaries
 */
std::vector<std::unordered_map<std::string, std::any>> sort_dicts_by_fields(
    const std::vector<std::unordered_map<std::string, std::any>>& dict_list,
    const std::vector<std::tuple<std::string, bool>>& sort_fields,
    const std::string& missing_strategy = "default",
    const std::any& default_value = nullptr);
