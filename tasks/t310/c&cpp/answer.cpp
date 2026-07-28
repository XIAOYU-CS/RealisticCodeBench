#include <string>
#include <map>
#include <vector>
#include <algorithm>

std::map<std::string, std::string> classify_memory_mapping(const std::string& maps_line) {
    std::vector<std::string> parts;
    size_t start = 0;
    size_t end = maps_line.find(' ');
    int count = 0;
    while (end != std::string::npos && count < 5) {
        parts.push_back(maps_line.substr(start, end - start));
        start = end + 1;
        end = maps_line.find(' ', start);
        count++;
    }
    std::string pathname = (count == 5 && start < maps_line.size()) ? maps_line.substr(start) : "";

    if (!pathname.empty() && pathname.front() == '[' && pathname.back() == ']') {
        std::string region_name = pathname.substr(1, pathname.size() - 2);
        if (region_name == "heap") {
            return {{"type", "heap"}};
        } else if (region_name == "stack") {
            return {{"type", "stack"}};
        } else if (region_name == "vdso") {
            return {{"type", "vdso"}};
        } else if (region_name == "vvar") {
            return {{"type", "vvar"}};
        } else {
            return {{"type", "anonymous"}};
        }
    }

    if (pathname.empty()) {
        return {{"type", "anonymous"}};
    }

    if (pathname.front() == '/') {
        if (pathname.find("/dev/") == 0) {
            return {{"type", "device"}};
        } else {
            return {{"type", "file"}};
        }
    }

    return {{"type", "unknown"}};
}
