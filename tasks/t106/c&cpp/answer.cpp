#include <string>
#include <type_traits>
#include <vector>

bool canClassToDict(const char* obj) {
    (void)obj;
    return false;
}

bool canClassToDict(const std::string& obj) {
    (void)obj;
    return false;
}

template <typename T>
bool canClassToDict(const std::vector<T>& obj) {
    (void)obj;
    return false;
}

template <typename T>
bool canClassToDict(const T& obj) {
    return std::is_class<T>::value || std::is_union<T>::value;
}
