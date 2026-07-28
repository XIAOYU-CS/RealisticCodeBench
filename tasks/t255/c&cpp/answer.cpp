#include <filesystem>
#include <stdexcept>
#include <string>

void copy_directory(const std::string& source_dir, const std::string& target_dir) {
    namespace fs = std::filesystem;

    if (!fs::exists(source_dir)) {
        throw std::invalid_argument("Source directory does not exist: " + source_dir);
    }
    if (!fs::is_directory(source_dir)) {
        throw std::invalid_argument("Source is not a directory: " + source_dir);
    }

    fs::create_directories(target_dir);
    fs::copy(source_dir, target_dir, fs::copy_options::recursive | fs::copy_options::overwrite_existing);
}
