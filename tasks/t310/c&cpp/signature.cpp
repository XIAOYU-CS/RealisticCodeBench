/**
 * @brief Parse memory mapping line and return detailed mapping type classification
 * 
 * @param maps_line A line of memory mapping information from /proc/[pid]/maps
 * @return std::map<std::string, std::string> Dictionary containing mapping type, key is 'type', value is the specific classification
 */
std::map<std::string, std::string> classify_memory_mapping(const std::string& maps_line);
