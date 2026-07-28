#include <vector>
#include <string>
#include <regex>
#include <sstream>
#include <stdexcept>

std::vector<int> parse_rank_range(const std::string& rank_range, int step = 1) {
    std::vector<int> rank_array;

    if (step <= 0) {
        return rank_array;
    }

    std::regex range_regex(R"(^(-?\d+)-{1,2}(\d+)$)");
    std::smatch range_match;
    std::istringstream ss(rank_range);
    std::string element;

    while (std::getline(ss, element, ',')) {
        element.erase(0, element.find_first_not_of(" \t\n\r\f\v"));
        element.erase(element.find_last_not_of(" \t\n\r\f\v") + 1);

        if (std::regex_match(element, range_match, range_regex)) {
            try {
                int start = std::stoi(range_match[1].str());
                int end = std::stoi(range_match[2].str());

                if (start <= end) {
                    for (int i = start; i <= end; i += step) {
                        rank_array.push_back(i);
                    }
                } else {
                    for (int i = start; i >= end; i -= step) {
                        rank_array.push_back(i);
                    }
                }
            } catch (const std::invalid_argument&) {
                continue;
            } catch (const std::out_of_range&) {
                continue;
            }
        } else {
            try {
                int num = std::stoi(element);
                rank_array.push_back(num);
            } catch (const std::invalid_argument&) {
                continue;
            } catch (const std::out_of_range&) {
                continue;
            }
        }
    }

    return rank_array;
}
