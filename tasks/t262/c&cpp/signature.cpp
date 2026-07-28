#include <string>
#include <unordered_map>
#include <variant>
#include <vector>

struct Any {
    using Array = std::vector<Any>;
    using Value = std::variant<std::nullptr_t, bool, int, double, std::string, Array>;

    Value value;

    Any();
    Any(std::nullptr_t);
    Any(bool value);
    Any(int value);
    Any(double value);
    Any(const std::string& value);
    Any(std::string&& value);
    Any(const char* value);
    Any(Array value);

    bool operator==(const char* rhs) const;
    bool operator==(const std::string& rhs) const;
    bool operator==(int rhs) const;
    bool operator==(double rhs) const;
};

bool operator==(const char* lhs, const Any& rhs);
bool operator==(int lhs, const Any& rhs);
bool operator==(double lhs, const Any& rhs);

std::unordered_map<std::string, Any> parse_json_file(const char* file_path);
std::unordered_map<std::string, Any> parse_json_file(const std::string& file_path);
