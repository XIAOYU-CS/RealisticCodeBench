#include <filesystem>
#include <stdexcept>
#include <string>

void empty_directory(const std::string& directoryPath) {
    namespace fs = std::filesystem;

    fs::path dir(directoryPath);
    if (!fs::exists(dir)) {
        throw std::invalid_argument("directory does not exist");
    }
    if (!fs::is_directory(dir)) {
        throw std::invalid_argument("path is not a directory");
    }

    for (const auto& entry : fs::directory_iterator(dir)) {
        fs::remove_all(entry.path());
    }
}
