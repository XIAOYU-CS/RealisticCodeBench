#include <vector>
#include <string>
#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>
#include <algorithm>

std::vector<std::string> get_foto_files(
    const std::string& directory = "/media/",
    const std::vector<std::string>& allowed_extensions = {".jpg"}
) {
    struct stat info;
    if (stat(directory.c_str(), &info) != 0) {
        throw std::runtime_error("Directory does not exist: " + directory);
    }
    if (!(info.st_mode & S_IFDIR)) {
        throw std::runtime_error("Not a directory: " + directory);
    }
    if (access(directory.c_str(), R_OK) != 0) {
        throw std::runtime_error("No read permission for directory: " + directory);
    }

    std::vector<std::string> lowercase_extensions;
    for (const auto& ext : allowed_extensions) {
        std::string lower_ext = ext;
        std::transform(lower_ext.begin(), lower_ext.end(), lower_ext.begin(), ::tolower);
        lowercase_extensions.push_back(lower_ext);
    }

    std::vector<std::string> foto_paths;
    DIR* dir = opendir(directory.c_str());
    if (dir) {
        struct dirent* entry;
        while ((entry = readdir(dir)) != nullptr) {
            std::string name = entry->d_name;
            if (name == "." || name == "..") {
                continue;
            }

            std::string full_path = directory + "/" + name;
            if (entry->d_type == DT_DIR) {
                auto subdir_files = get_foto_files(full_path, allowed_extensions);
                foto_paths.insert(foto_paths.end(), subdir_files.begin(), subdir_files.end());
            } else if (entry->d_type == DT_REG) {
                size_t dot_pos = name.find_last_of('.');
                if (dot_pos != std::string::npos) {
                    std::string ext = name.substr(dot_pos);
                    std::transform(ext.begin(), ext.end(), ext.begin(), ::tolower);
                    if (std::find(lowercase_extensions.begin(), lowercase_extensions.end(), ext) != lowercase_extensions.end()) {
                        char abs_path[PATH_MAX];
                        realpath(full_path.c_str(), abs_path);
                        foto_paths.push_back(abs_path);
                    }
                }
            }
        }
        closedir(dir);
    }
    return foto_paths;
}
