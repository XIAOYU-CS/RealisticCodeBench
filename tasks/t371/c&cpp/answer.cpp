
#include <iostream>
#include <fstream>
#include <string>
#include <tuple>
#include <vector>
#include <sys/stat.h>
#include <unistd.h>
#include <cstring>
#include <cerrno>
#include <dirent.h>
#include <utime.h>

std::tuple<bool, std::string> copy_file(
    const std::string& source_path,
    const std::string& dest_path,
    bool overwrite = false,
    bool preserve_metadata = true,
    bool follow_symlinks = false,
    int buffer_size = 1024 * 1024
) {
    if (source_path.empty() || dest_path.empty() || buffer_size <= 0) {
        return std::make_tuple(false, "[invalid argument]");
    }

    char resolved_source[PATH_MAX];
    char resolved_dest[PATH_MAX];
    if (realpath(source_path.c_str(), resolved_source) == nullptr) {
        return std::make_tuple(false, "[cannot resolve source path]");
    }
    if (realpath(dest_path.c_str(), resolved_dest) == nullptr) {
        strncpy(resolved_dest, dest_path.c_str(), PATH_MAX);
    }

    struct stat source_stat;
    if (lstat(resolved_source, &source_stat) != 0) {
        return std::make_tuple(false, "[cannot resolve source path]");
    }

    if (S_ISLNK(source_stat.st_mode) && !follow_symlinks) {
        return std::make_tuple(false, "[source is symlink, not followed]");
    }

    if (!S_ISREG(source_stat.st_mode)) {
        return std::make_tuple(false, "[source is not a file]");
    }

    struct stat dest_stat;
    if (stat(resolved_dest, &dest_stat) == 0) {
        if (!overwrite) {
            return std::make_tuple(false, "[destination exists, not overwritten]");
        }
        if (S_ISDIR(dest_stat.st_mode)) {
            return std::make_tuple(false, "[destination is a directory]");
        }
    }

    std::string dest_dir = dest_path.substr(0, dest_path.find_last_of('/'));
    if (!dest_dir.empty()) {
        mkdir(dest_dir.c_str(), 0777);
    }

    try {
        if (follow_symlinks) {
            std::ifstream src(resolved_source, std::ios::binary);
            std::ofstream dst(resolved_dest, std::ios::binary);
            std::vector<char> buffer(buffer_size);
            while (src) {
                src.read(buffer.data(), buffer_size);
                dst.write(buffer.data(), src.gcount());
            }
            if (preserve_metadata) {
                struct utimbuf times;
                times.actime = source_stat.st_atime;
                times.modtime = source_stat.st_mtime;
                utime(resolved_dest, &times);
            }
        } else {
            std::ifstream src(resolved_source, std::ios::binary);
            std::ofstream dst(resolved_dest, std::ios::binary);
            dst << src.rdbuf();
            if (preserve_metadata) {
                struct utimbuf times;
                times.actime = source_stat.st_atime;
                times.modtime = source_stat.st_mtime;
                utime(resolved_dest, &times);
            }
        }

        struct stat new_dest_stat;
        if (stat(resolved_dest, &new_dest_stat) != 0 || source_stat.st_size != new_dest_stat.st_size) {
            unlink(resolved_dest);
            return std::make_tuple(false, "[file size mismatch after copy]");
        }

        return std::make_tuple(true, "[file copied successfully]");
    } catch (const std::exception& e) {
        unlink(resolved_dest);
        return std::make_tuple(false, "[copy failed: " + std::string(e.what()) + "]");
    }
}
