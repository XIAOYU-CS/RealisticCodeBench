#include "signature.cpp"

Object mergeObjectsWithOverwrite(const Object& obj1, const Object& obj2) {
    Object merged = obj1;
    for (const auto& [key, value] : obj2) {
        merged[key] = value;
    }
    return merged;
}
