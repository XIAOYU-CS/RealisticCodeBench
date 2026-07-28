#include <map>
#include <string>

struct AnyObject {
    std::map<std::string, AnyObject> fields;
};

bool compareObjectsDepth(const AnyObject& obj1, const AnyObject& obj2);
