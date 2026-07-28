
#include <functional>
#include <string>
#include <vector>

/**
 * @brief Check if all objects in the list have the same value for the specified attribute.
 *
 * T is expected to expose bool hasAttr(const std::string&) const and
 * U getAttr(const std::string&) const.
 */
template <typename T, typename Comparator = std::nullptr_t>
bool check_all_same_attribute(
    const std::vector<T>& obj_list,
    const std::string& attr_name,
    Comparator comparator = nullptr,
    int default_val = 0);
