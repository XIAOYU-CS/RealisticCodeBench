#include <iostream>
#include <string>
#include <vector>
#include <regex>
#include <sstream>
#include <algorithm>

struct SummaryResult {
    std::string summary;
    std::vector<std::string> categories;

    bool operator==(const SummaryResult& other) const {
        return summary == other.summary && categories == other.categories;
    }
};

SummaryResult parse_summary_and_extract_categories(const std::string& summarizedOutput) {
    std::regex categoriesRegex(R"(\s*Categories:\s*\[([^\]]+)\]\s*)", std::regex_constants::icase);
    std::smatch match;

    SummaryResult result;
    result.summary = summarizedOutput;

    if (std::regex_search(summarizedOutput, match, categoriesRegex) && match.size() > 1) {
        std::string categoriesStr = match[1].str();
        std::istringstream iss(categoriesStr);
        std::string category;

        while (std::getline(iss, category, ',')) {
            category.erase(std::remove_if(category.begin(), category.end(), ::isspace), category.end());
            if (!category.empty()) {
                result.categories.push_back(category);
            }
        }

        result.summary = std::regex_replace(result.summary, categoriesRegex, " ");
        result.summary = std::regex_replace(result.summary, std::regex("^\\s+|\\s+$"), "");
    }

    return result;
}
