#include <vector>
#include <string>
#include <map>
#include <optional>

using namespace std;

bool check_permissions(
    const string& line,
    const optional<vector<string>>& required_perms = nullopt,
    const string& user_category = "other"
) {
    string perms;
    try {
        size_t first_space = line.find(' ');
        if (first_space == string::npos || first_space < 1) {
            return false;
        }
        perms = line.substr(0, first_space);
        if (perms.length() < 9) {
            return false;
        }
    } catch (...) {
        return false;
    }

    map<string, pair<int, int>> category_map = {
        {"owner", {0, 3}},
        {"group", {3, 6}},
        {"other", {6, 9}}
    };

    auto it = category_map.find(user_category);
    if (it == category_map.end()) {
        return false;
    }
    int start = it->second.first;
    int end = it->second.second;
    string target_perms = perms.substr(start, end - start);

    const vector<string> empty_perms;
    const vector<string>& perms_to_check = required_perms.value_or(empty_perms);
    for (const string& perm : perms_to_check) {
        if (target_perms.find(perm) == string::npos) {
            return false;
        }
    }
    return true;
}
