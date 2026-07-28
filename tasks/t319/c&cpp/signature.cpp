
/**
 * @brief Evaluate modules involved in a command based on external configuration to determine associations.
 * 
 * @param command Command string to be evaluated
 * @param config Configuration containing module definitions and judgment rules.
 * @return std::map<std::string, std::string> Results indicating whether each module is used ("yes"/"no")
 * 
 * @example
 * Config config = {
 *     {"network", "database", "ui"},
 *     {{{"connect", "disconnect"}, {"network"}}}
 * };
 * evaluate_command("connect to server", config);
 * // Returns {"network": "yes", "database": "no", "ui": "no"}
 */
struct Rule {
    std::vector<std::string> keywords;
    std::vector<std::string> sections;
};

struct Config {
    std::vector<std::string> sections;
    std::vector<Rule> rules;
};

std::map<std::string, std::string> evaluate_command(const std::string& command, const Config& config);
