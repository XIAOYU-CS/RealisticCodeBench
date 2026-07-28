#include <algorithm>
#include <any>
#include <cmath>
#include <string>
#include <tuple>
#include <unordered_map>
#include <vector>

namespace {

bool is_number(const std::any& value) {
    return value.type() == typeid(int) || value.type() == typeid(long) ||
           value.type() == typeid(long long) || value.type() == typeid(float) ||
           value.type() == typeid(double);
}

double number_value(const std::any& value) {
    if (value.type() == typeid(int)) {
        return static_cast<double>(std::any_cast<int>(value));
    }
    if (value.type() == typeid(long)) {
        return static_cast<double>(std::any_cast<long>(value));
    }
    if (value.type() == typeid(long long)) {
        return static_cast<double>(std::any_cast<long long>(value));
    }
    if (value.type() == typeid(float)) {
        return static_cast<double>(std::any_cast<float>(value));
    }
    return std::any_cast<double>(value);
}

std::string string_value(const std::any& value) {
    if (value.type() == typeid(std::string)) {
        return std::any_cast<std::string>(value);
    }
    if (value.type() == typeid(const char*)) {
        return std::string(std::any_cast<const char*>(value));
    }
    if (value.type() == typeid(char*)) {
        return std::string(std::any_cast<char*>(value));
    }
    if (is_number(value)) {
        double number = number_value(value);
        if (std::floor(number) == number) {
            return std::to_string(static_cast<long long>(number));
        }
        return std::to_string(number);
    }
    return value.has_value() ? value.type().name() : "";
}

int compare_any(const std::any& left, const std::any& right) {
    if (is_number(left) && is_number(right)) {
        double a = number_value(left);
        double b = number_value(right);
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    std::string a = string_value(left);
    std::string b = string_value(right);
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

} // namespace

std::vector<std::unordered_map<std::string, std::any>> sort_dicts_by_fields(
    const std::vector<std::unordered_map<std::string, std::any>>& dict_list,
    const std::vector<std::tuple<std::string, bool>>& sort_fields,
    const std::string& missing_strategy = "default",
    const std::any& default_value = nullptr) {

    auto result = dict_list;

    std::stable_sort(result.begin(), result.end(),
        [&](const auto& left, const auto& right) {
            for (const auto& [field_name, ascending] : sort_fields) {
                auto left_it = left.find(field_name);
                auto right_it = right.find(field_name);
                bool left_has_value = left_it != left.end();
                bool right_has_value = right_it != right.end();

                if (!left_has_value || !right_has_value) {
                    if (missing_strategy == "first") {
                        if (left_has_value != right_has_value) {
                            return !left_has_value;
                        }
                        continue;
                    }
                    if (missing_strategy == "last") {
                        if (left_has_value != right_has_value) {
                            return left_has_value;
                        }
                        continue;
                    }
                }

                const std::any& left_value = left_has_value ? left_it->second : default_value;
                const std::any& right_value = right_has_value ? right_it->second : default_value;
                int cmp = compare_any(left_value, right_value);
                if (cmp != 0) {
                    return ascending ? cmp < 0 : cmp > 0;
                }
            }
            return false;
        });

    return result;
}
