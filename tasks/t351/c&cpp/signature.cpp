/**
 * @brief Parses a string representing a list of ranks or rank ranges into an array of numbers.
 * 
 * The input string can contain:
 * - Single integers: "1, 2, 3"
 * - Ranges separated by double hyphen "--" or single hyphen "-": "1--5", "10-5"
 * - Mixed format: "1, 3--7, 10"
 * 
 * A step value controls the increment/decrement within ranges.
 * Only integers (or values convertible to integers) are supported.
 * 
 * @param rank_range The string containing ranks and/or ranges.
 * @param step The increment step for ranges (must be positive). Defaults to 1.
 * @return std::vector<int> An array of parsed integers in order.
 */
std::vector<int> parse_rank_range(const std::string& rank_range, int step = 1);
