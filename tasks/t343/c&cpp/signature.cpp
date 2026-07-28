/**
 * @brief Generate a specified number of random subsets
 * 
 * @param start Start value of the integer range (inclusive)
 * @param stop End value of the integer range (exclusive)
 * @param size Number of elements in each subset
 * @param count Number of subsets to generate
 * @param step Step size between elements, default is 1 (consecutive integers)
 * @param allow_duplicates Whether to allow duplicate subsets, default is true
 * @param shuffle Whether to randomly shuffle elements within subsets, default is false
 * @param data_source Optional data source list; if provided, elements will be selected from this list
 * @return std::vector<std::vector<T>> A list containing multiple subsets
 */
template <typename T>
std::vector<std::vector<T>> generate_random_subsets(
    int start,
    int stop,
    int size,
    int count,
    int step = 1,
    bool allow_duplicates = true,
    bool shuffle = false,
    const std::vector<T>* data_source = nullptr
);
