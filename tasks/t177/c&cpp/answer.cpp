#include "signature.cpp"

#include <algorithm>
#include <cctype>

namespace {
std::string lowerValueForKey(const Record& record, const std::string& key) {
    auto it = record.find(key);
    std::string value = it == record.end() ? "" : it->second;
    std::transform(value.begin(), value.end(), value.begin(), [](unsigned char ch) {
        return static_cast<char>(std::tolower(ch));
    });
    return value;
}
}

std::vector<Record> sortByKey(const std::vector<Record>& array, const std::string& key) {
    std::vector<Record> sorted = array;
    std::stable_sort(sorted.begin(), sorted.end(), [&](const Record& a, const Record& b) {
        return lowerValueForKey(a, key) < lowerValueForKey(b, key);
    });
    return sorted;
}
