#include <filesystem>
#include <string>
#include <stdexcept>
#include <cstdlib>
#include <unistd.h>
#include <pwd.h>
#include <iostream>

namespace fs = std::filesystem;

/**
 * @brief Expand tilde (~) to user's home directory
 *
 * This helper function replaces the tilde character at the beginning of a path
 * with the user's home directory path.
 *
 * @param path The input path that may contain a tilde
 * @return std::string The expanded path with tilde replaced by home directory,
 *                     or the original path if no tilde or home directory not found
 */
std::string expand_user(const std::string& path) {
    if (path.empty() || path[0] != '~') {
        return path;
    }

    const char* home = getenv("HOME");
    if (!home) {
        // Fallback to getpwuid if HOME is not set
        struct passwd *pw = getpwuid(getuid());
        home = pw ? pw->pw_dir : nullptr;
    }

    if (home) {
        return std::string(home) + path.substr(1);
    }

    return path; // fallback
}

/**
 * @brief Enhanced function to convert relative paths to absolute paths with multiple path processing features
 *
 * This function provides comprehensive path resolution capabilities including:
 * - Expanding user home directory symbols (~)
 * - Resolving relative paths against a base directory
 * - Normalizing paths to remove redundant components
 * - Optionally checking path existence
 * - Optionally resolving symbolic links
 * - Handling various edge cases and error conditions
 *
 * @param path Input path (can be relative path, absolute path, or path containing ~ symbol)
 * @param base_dir Base directory for resolving relative paths, defaults to current working directory
 * @param normalize Whether to normalize the path (remove redundant ./ and ../ and duplicate separators)
 * @param check_exists Whether to check if the path actually exists
 * @param resolve_symlinks Whether to resolve symbolic links
 * @param allow_non_existent When check_exists=false, whether to allow returning non-existent absolute paths
 *
 * @return std::string Resolved absolute path string; returns empty string on failure
 */
std::string resolve_path(
    const std::string& path,
    const std::string& base_dir = "",
    bool normalize = true,
    bool check_exists = false,
    bool resolve_symlinks = true,
    bool allow_non_existent = true
) {
    try {
        if (path.empty() || path.find_first_not_of(" \t\n\v\f\r") == std::string::npos) {
            return ""; // or throw or return empty optional if you prefer
        }

        std::string expanded_path = expand_user(path);

        fs::path base;
        if (!base_dir.empty()) {
            base = fs::path(base_dir);
            if (!base.is_absolute()) {
                base = fs::absolute(base);
            }
        } else {
            base = fs::current_path();
        }

        if (!fs::is_directory(base)) {
            return "";
        }

        fs::path combined;
        if (fs::path(expanded_path).is_absolute()) {
            combined = expanded_path;
        } else {
            combined = base / expanded_path;
        }

        fs::path resolved;
        if (resolve_symlinks) {
            // canonical throws if path doesn't exist unless we catch it
            try {
                resolved = fs::canonical(combined);
            } catch (const fs::filesystem_error&) {
                if (check_exists) {
                    return "";
                }
                resolved = fs::absolute(combined);
            }
        } else {
            resolved = fs::absolute(combined);
        }

        if (normalize) {
            resolved = resolved.lexically_normal();
        }

        std::string final_path = resolved.string();

        // Strip trailing slash if needed
        if (!final_path.empty() && final_path.back() == '/') {
            final_path.pop_back();
        }

        if (check_exists) {
            if (!fs::exists(resolved)) {
                return "";
            }
        } else {
            if (!allow_non_existent && !fs::exists(resolved)) {
                return "";
            }
        }

        return final_path;

    } catch (const fs::filesystem_error&) {
        return "";
    } catch (...) {
        return "";
    }
}