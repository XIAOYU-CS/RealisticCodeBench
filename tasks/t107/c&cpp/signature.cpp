#include <any>
#include <map>
#include <string>

using AttributeMap = std::map<std::string, std::any>;

AttributeMap convert_class_instance_to_dict(const AttributeMap& obj);

template <typename T>
AttributeMap convert_class_instance_to_dict(const T& obj) {
    return obj.to_dict();
}
