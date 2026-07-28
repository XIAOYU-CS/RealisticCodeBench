
#include <functional>
#include <string>
#include <type_traits>
#include <vector>

template <typename T, typename Comparator = std::nullptr_t>
bool check_all_same_attribute(
    const std::vector<T>& obj_list,
    const std::string& attr_name,
    Comparator comparator = nullptr,
    int default_val = 0) {
    if (obj_list.empty()) {
        return true;
    }

    int first_val = obj_list[0].hasAttr(attr_name) ? obj_list[0].getAttr(attr_name) : default_val;
    for (size_t i = 1; i < obj_list.size(); ++i) {
        int current_val = obj_list[i].hasAttr(attr_name) ? obj_list[i].getAttr(attr_name) : default_val;
        const bool same = [&]() {
            if constexpr (std::is_same_v<std::decay_t<Comparator>, std::nullptr_t>) {
                return current_val == first_val;
            } else {
                return comparator(current_val, first_val);
            }
        }();
        if (!same) {
            return false;
        }
    }
    return true;
}
