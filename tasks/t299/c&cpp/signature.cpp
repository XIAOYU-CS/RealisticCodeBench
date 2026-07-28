/**
 * @brief Check whether each row in data satisfies multiple XOR constraints.
 * 
 * @param data 2D array or list with shape (N, C), where N is the number of rows and C is the number of columns.
 * @param xor_groups Each sublist contains column indices to XOR, e.g., {{0,3,6}, {1,4,7}, {2,5}}.
 * @param target_values Target XOR result for each group, e.g., {0x6b, 0x76, 0x12}.
 * @return std::vector<bool> A boolean list of length N, indicating whether each row satisfies all XOR constraints.
 */
std::vector<bool> check_xor_constraints(const std::vector<std::vector<int>>& data, const std::vector<std::vector<int>>& xor_groups, const std::vector<int>& target_values);