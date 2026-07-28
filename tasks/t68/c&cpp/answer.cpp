#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>
#include <cctype>
#include <algorithm>

std::unordered_map<std::string, std::vector<std::string>> classify_files_by_extension(const std::vector<std::string>& fileNames) {
    std::unordered_map<std::string, std::vector<std::string>> classifiedFiles;

    for (const auto& file : fileNames) {
        // Find the last dot in the filename
        size_t dotPos = file.find_last_of('.');
        
        if (dotPos != std::string::npos && dotPos + 1 < file.size()) {
            // Extract the extension
            std::string ext = file.substr(dotPos + 1);

            // Convert the extension to lowercase
            std::transform(ext.begin(), ext.end(), ext.begin(),
                           [](unsigned char c){ return std::tolower(c); });

            // Add the file to the corresponding list
            classifiedFiles[ext].push_back(file);
        }
    }

    return classifiedFiles;
}
