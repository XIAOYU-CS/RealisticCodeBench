
#include <iostream>
#include <string>
#include <vector>
#include <utility>
#include <tuple>
#include <optional>
#include <ctime>
#include <unistd.h>
#include <limits.h>
#include <sys/stat.h>
#include <cstring>
#include <memory>
#include <cstdlib>

using namespace std;

static vector<pair<time_t, string>> cd_history;
const int DEFAULT_HISTORY_LIMIT = 10;

tuple<bool, string, optional<string>> enhanced_cd(
    const optional<string>& target = nullopt,
    int history_limit = DEFAULT_HISTORY_LIMIT,
    bool preserve_history = true
) {
    char current_dir[PATH_MAX];
    if (getcwd(current_dir, sizeof(current_dir)) == nullptr) {
        return {false, "Error: Failed to get current directory", nullopt};
    }

    string target_path = target.value_or("");
    if (history_limit <= 0) {
        cd_history.clear();
    }

    if (target_path.empty()) {
        return {true, "Current directory: " + string(current_dir), current_dir};
    }

    try {
        string resolved_target;
        if (target_path == "-") {
            if (!cd_history.empty()) {
                resolved_target = cd_history.back().second;
            } else {
                return {false, "Error: No history directory record", nullopt};
            }
        } else {
            char* expanded_path = realpath(target_path.c_str(), nullptr);
            if (expanded_path == nullptr) {
                return {false, "Error: Path does not exist - " + target_path, nullopt};
            }
            resolved_target = expanded_path;
            free(expanded_path);
        }

        struct stat path_stat;
        if (stat(resolved_target.c_str(), &path_stat) != 0) {
            return {false, "Error: Path does not exist - " + target_path, nullopt};
        }
        if (!S_ISDIR(path_stat.st_mode)) {
            return {false, "Error: Not a valid directory - " + target_path, nullopt};
        }

        if (preserve_history && target_path != "-" && history_limit > 0) {
            cd_history.emplace_back(time(nullptr), current_dir);
            if (cd_history.size() > static_cast<size_t>(history_limit)) {
                cd_history.erase(cd_history.begin(), cd_history.end() - history_limit);
            }
        }

        if (chdir(resolved_target.c_str()) != 0) {
            return {false, "Error: Failed to change directory - " + target_path, nullopt};
        }

        char new_dir[PATH_MAX];
        if (getcwd(new_dir, sizeof(new_dir)) == nullptr) {
            return {false, "Error: Failed to get new directory", nullopt};
        }

        if (preserve_history && target_path == "-" && history_limit > 0) {
            cd_history.emplace_back(time(nullptr), current_dir);
            if (cd_history.size() > static_cast<size_t>(history_limit)) {
                cd_history.erase(cd_history.begin(), cd_history.end() - history_limit);
            }
        }

        return {true, "Changed to: " + string(new_dir), new_dir};
    } catch (const exception& e) {
        return {false, "Change directory failed: " + string(e.what()), nullopt};
    }
}
