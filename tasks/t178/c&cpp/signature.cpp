#include <string>
#include <vector>

struct SummaryResult {
    std::string summary;
    std::vector<std::string> categories;

    bool operator==(const SummaryResult& other) const;
};
/**
 * Extracts categories from a summarized output string and returns the cleaned summary and categories.
 * The categories are expected to be in the format "Categories: [category1, category2, ...]".
 *
 * @param summarizedOutput - The summary text potentially containing categorized question.
 * @returns A SummaryResult struct containing the cleaned summary text and a vector of categories.
 */
SummaryResult parse_summary_and_extract_categories(const std::string& summarizedOutput);
