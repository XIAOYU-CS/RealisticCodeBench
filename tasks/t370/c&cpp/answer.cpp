
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <dirent.h>
#include <sys/stat.h>
#include <ctime>
#include <cstring>
#include <utility>

using namespace std;

struct FileEntry {
    string name;
    string path;
    bool is_dir;
    long size;
    time_t mtime;
};

pair<bool, string> command_ls(const string& directory = "", const string& sort_by = "name", bool reverse = false) {
    vector<string> valid_sort_options = {"name", "size", "mtime"};
    if (find(valid_sort_options.begin(), valid_sort_options.end(), sort_by) == valid_sort_options.end()) {
        return make_pair(false, "Invalid sort option. Must be one of: name, size, mtime");
    }

    try {
        string target_dir;
        if (directory.empty()) {
            target_dir = ".";
        } else {
            struct stat info;
            if (stat(directory.c_str(), &info) != 0 || !(info.st_mode & S_IFDIR)) {
                return make_pair(false, "[invalid directory path]");
            }
            target_dir = directory;
        }

        vector<FileEntry> entries;
        DIR *dir;
        struct dirent *ent;
        if ((dir = opendir(target_dir.c_str())) != nullptr) {
            while ((ent = readdir(dir)) != nullptr) {
                if (strcmp(ent->d_name, ".") == 0 || strcmp(ent->d_name, "..") == 0) {
                    continue;
                }

                string entry_name = ent->d_name;
                string entry_path = target_dir + "/" + entry_name;

                struct stat stat_info;
                if (stat(entry_path.c_str(), &stat_info) != 0) {
                    continue;
                }

                FileEntry entry;
                entry.name = entry_name;
                entry.path = entry_path;
                entry.is_dir = S_ISDIR(stat_info.st_mode);
                entry.size = stat_info.st_size;
                entry.mtime = stat_info.st_mtime;

                entries.push_back(entry);
            }
            closedir(dir);
        } else {
            return make_pair(false, "Error: Could not open directory");
        }

        if (sort_by == "name") {
            sort(entries.begin(), entries.end(), [reverse](const FileEntry& a, const FileEntry& b) {
                string a_name = a.name;
                string b_name = b.name;
                transform(a_name.begin(), a_name.end(), a_name.begin(), ::tolower);
                transform(b_name.begin(), b_name.end(), b_name.begin(), ::tolower);
                return reverse ? a_name > b_name : a_name < b_name;
            });
        } else if (sort_by == "size") {
            sort(entries.begin(), entries.end(), [reverse](const FileEntry& a, const FileEntry& b) {
                if (a.is_dir != b.is_dir) {
                    return reverse ? b.is_dir : a.is_dir;
                }
                return reverse ? b.size > a.size : a.size < b.size;
            });
        } else if (sort_by == "mtime") {
            sort(entries.begin(), entries.end(), [reverse](const FileEntry& a, const FileEntry& b) {
                return reverse ? b.mtime > a.mtime : a.mtime < b.mtime;
            });
        }

        string result;
        for (const auto& item : entries) {
            if (item.is_dir) {
                result += "[DIR]                     " + item.name + "\n";
            } else {
                char size_str[20];
                snprintf(size_str, sizeof(size_str), "%10ld", item.size);
                result += "[FILE] " + string(size_str) + " bytes   " + item.name + "\n";
            }
        }

        return make_pair(true, "\n" + result);
    } catch (const exception& e) {
        return make_pair(false, "Error: " + string(e.what()));
    }
}
