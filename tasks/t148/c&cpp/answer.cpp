#include <cmath>
#include <stdexcept>
#include <string>
#include <type_traits>
#include <vector>

template<typename T>
bool removeElementsMatch(const T& item, const T& element, bool /*useStrict*/) {
    if constexpr (std::is_floating_point_v<T>) {
        return (std::isnan(item) && std::isnan(element)) || item == element;
    } else {
        return item == element;
    }
}

template<typename T>
std::vector<T> removeElements(const std::vector<T>& array,
                             const T& element,
                             const std::string& mode = "first",
                             double limit = 1,
                             bool useStrict = true) {
    if (mode != "first" && mode != "all" && mode != "limit") {
        throw std::domain_error("invalid mode");
    }
    if (mode == "limit" && (limit < 1 || std::floor(limit) != limit)) {
        throw std::invalid_argument("limit must be a positive integer");
    }

    const int maxRemove = mode == "all" ? -1 : static_cast<int>(limit);
    int removed = 0;
    std::vector<T> result;
    result.reserve(array.size());

    for (const auto& item : array) {
        const bool canRemoveMore = maxRemove < 0 || removed < maxRemove;
        if (canRemoveMore && removeElementsMatch(item, element, useStrict)) {
            ++removed;
        } else {
            result.push_back(item);
        }
    }
    return result;
}
