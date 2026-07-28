
#include <filesystem>
#include <string>

namespace fs = std::filesystem;

bool is_valid_path_format(const std::string& path_str) {
    try {
        if (path_str.find_first_of("?*\"<>|") != std::string::npos) {
            return false;
        }

        fs::path path(path_str);
        return path.is_absolute() || path.relative_path().string().find('/') != std::string::npos;
    } catch (...) {
        return false;
    }
}
