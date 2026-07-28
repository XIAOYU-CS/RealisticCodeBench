#include <any>
#include <map>
#include <string>

using Object = std::map<std::string, std::any>;

Object mergeObjectsWithOverwrite(const Object& obj1, const Object& obj2);
