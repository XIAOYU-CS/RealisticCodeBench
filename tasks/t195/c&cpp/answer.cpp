#include "signature.cpp"

#include <algorithm>
#include <cctype>
#include <stdexcept>

static std::string lower_copy(const std::string& value) {
    std::string result = value;
    std::transform(result.begin(), result.end(), result.begin(),
                   [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
    return result;
}

static double numeric_value(const FieldValue& value) {
    if (const auto* int_value = std::get_if<int>(&value)) {
        return *int_value;
    }
    return std::get<double>(value);
}

static std::string field_to_string(const FieldValue& value) {
    if (const auto* text = std::get_if<std::string>(&value)) {
        return *text;
    }
    if (const auto* int_value = std::get_if<int>(&value)) {
        return std::to_string(*int_value);
    }
    return std::to_string(std::get<double>(value));
}

std::vector<Row> sort_by_field(const std::vector<Row>& array, const std::string& field, bool ascending) {
    if (array.empty() || array.front().find(field) == array.front().end()) {
        throw std::invalid_argument("Field does not exist in the objects.");
    }

    std::vector<Row> sorted = array;
    std::stable_sort(sorted.begin(), sorted.end(), [&](const Row& left, const Row& right) {
        const FieldValue& a = left.at(field);
        const FieldValue& b = right.at(field);

        if (std::holds_alternative<std::string>(a) || std::holds_alternative<std::string>(b)) {
            return lower_copy(field_to_string(a)) < lower_copy(field_to_string(b));
        }

        return numeric_value(a) < numeric_value(b);
    });

    if (!ascending) {
        std::reverse(sorted.begin(), sorted.end());
    }
    return sorted;
}
