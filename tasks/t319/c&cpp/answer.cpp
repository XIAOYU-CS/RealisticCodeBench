#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <cctype>
#include <stdexcept>

struct Rule {
    std::vector<std::string> keywords;
    std::vector<std::string> sections;
};

struct Config {
    std::vector<std::string> sections;
    std::vector<Rule> rules;
};

std::map<std::string, std::string> evaluate_command(const std::string& command, const Config& config) {
    std::map<std::string, std::string> result;
    for (const auto& section : config.sections) {
        result[section] = "no";
    }

    std::string command_lower = command;
    std::transform(command_lower.begin(), command_lower.end(), command_lower.begin(), ::tolower);

    for (const auto& rule : config.rules) {
        bool found = false;
        for (const auto& keyword : rule.keywords) {
            std::string keyword_lower = keyword;
            std::transform(keyword_lower.begin(), keyword_lower.end(), keyword_lower.begin(), ::tolower);
            if (command_lower.find(keyword_lower) != std::string::npos) {
                found = true;
                break;
            }
        }

        if (found) {
            for (const auto& section : rule.sections) {
                if (result.find(section) != result.end()) {
                    result[section] = "yes";
                }
            }
        }
    }

    return result;
}
