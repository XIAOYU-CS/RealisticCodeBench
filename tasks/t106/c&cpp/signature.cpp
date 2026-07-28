#include <string>
#include <vector>

bool canClassToDict(const char* obj);
bool canClassToDict(const std::string& obj);

template <typename T>
bool canClassToDict(const std::vector<T>& obj);

template <typename T>
bool canClassToDict(const T& obj);
