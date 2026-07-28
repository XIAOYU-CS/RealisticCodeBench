
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <cctype>
#include <ctime>
#include <filesystem>
#include <optional>
#include <variant>
#include <unistd.h>
#include <sys/stat.h>
#include <cstring>

namespace fs = std::filesystem;

std::variant<std::string, fs::path, std::map<std::string, bool>, std::map<std::string, std::vector<std::string>>, bool, std::nullopt_t>
cwd_utils(
    const std::string& action = "get",
    const std::string& format_type = "string",
    bool follow_symlinks = true,
    bool show_hidden = false,
    const std::string& sort_by = "name",
    const std::optional<std::string>& new_dir = std::nullopt
) {
    try {
        // Get current working directory
        if (action == "get") {
            fs::path cwd = fs::current_path();
            if (follow_symlinks) {
                cwd = fs::canonical(cwd);
            }
            if (format_type == "string") {
                return cwd.string();
            }
            return cwd;
        }

        // Check directory permissions
        else if (action == "permissions") {
            fs::path cwd = fs::current_path();
            std::map<std::string, bool> permissions;
            permissions["read"] = access(cwd.c_str(), R_OK) == 0;
            permissions["write"] = access(cwd.c_str(), W_OK) == 0;
            permissions["execute"] = access(cwd.c_str(), X_OK) == 0;
            permissions["exists"] = fs::exists(cwd);
            return permissions;
        }

        // List directory contents
        else if (action == "list") {
            fs::path cwd = fs::current_path();
            std::map<std::string, std::vector<std::string>> contents;
            contents["directories"] = {};
            contents["files"] = {};

            for (const auto& entry : fs::directory_iterator(cwd)) {
                const std::string name = entry.path().filename().string();
                
                // Skip hidden files if not requested
                if (!show_hidden && name[0] == '.') {
                    continue;
                }

                try {
                    if (fs::is_directory(entry.status())) {
                        contents["directories"].push_back(name);
                    } else {
                        contents["files"].push_back(name);
                    }
                } catch (const fs::filesystem_error&) {
                    // Handle broken symlinks or inaccessible items
                    continue;
                }
            }

            // Sorting logic
            auto sort_key = [&cwd, &sort_by](const std::string& name) -> std::variant<size_t, std::time_t, std::string> {
                fs::path path = cwd / name;
                try {
                    if (sort_by == "size") {
                        if (fs::is_directory(path)) {
                            return static_cast<size_t>(0);
                        }
                        return static_cast<size_t>(fs::file_size(path));
                    } else if (sort_by == "modified") {
                        return static_cast<std::time_t>(fs::last_write_time(path).time_since_epoch().count());
                    }
                } catch (const fs::filesystem_error&) {
                    if (sort_by == "size") {
                        return static_cast<size_t>(0);
                    }
                    if (sort_by == "modified") {
                        return static_cast<std::time_t>(0);
                    }
                    return std::string("");
                }
                // Default: sort by name (case-insensitive)
                std::string lower_name = name;
                std::transform(lower_name.begin(), lower_name.end(), lower_name.begin(),
                               [](unsigned char ch) { return static_cast<char>(std::tolower(ch)); });
                return lower_name;
            };

            auto compare = [&sort_key](const std::string& a, const std::string& b) {
                auto val_a = sort_key(a);
                auto val_b = sort_key(b);
                
                if (std::holds_alternative<size_t>(val_a) && std::holds_alternative<size_t>(val_b)) {
                    return std::get<size_t>(val_a) < std::get<size_t>(val_b);
                } else if (std::holds_alternative<std::time_t>(val_a) && std::holds_alternative<std::time_t>(val_b)) {
                    return std::get<std::time_t>(val_a) < std::get<std::time_t>(val_b);
                } else {
                    return std::get<std::string>(val_a) < std::get<std::string>(val_b);
                }
            };

            std::sort(contents["directories"].begin(), contents["directories"].end(), compare);
            std::sort(contents["files"].begin(), contents["files"].end(), compare);
            return contents;
        }

        // Change current directory
        else if (action == "change") {
            if (!new_dir || new_dir->empty()) {
                throw std::invalid_argument("new_dir parameter is required for 'change' action");
            }
            fs::current_path(*new_dir);
            return true;
        }

        else {
            throw std::invalid_argument("Unsupported action: " + action);
        }
    } catch (const fs::filesystem_error& e) {
        std::cerr << "Filesystem error: " << e.what() << std::endl;
        return std::nullopt;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return std::nullopt;
    }
}
