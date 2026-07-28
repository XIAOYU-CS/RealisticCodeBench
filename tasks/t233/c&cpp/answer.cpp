#include "signature.cpp"

bool compareObjectsDepth(const AnyObject& obj1, const AnyObject& obj2) {
    if (obj1.fields.size() != obj2.fields.size()) {
        return false;
    }

    for (const auto& [key, child1] : obj1.fields) {
        auto it = obj2.fields.find(key);
        if (it == obj2.fields.end() || !compareObjectsDepth(child1, it->second)) {
            return false;
        }
    }

    return true;
}
