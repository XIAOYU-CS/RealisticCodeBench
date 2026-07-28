#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <limits>
#include <optional>
#include <tuple>
#include <vector>

std::tuple<std::optional<int>, int> get_min_seq_num_and_distance(const std::string& file_path, const std::string& word1, const std::string& word2) {
    std::ifstream file(file_path);
    if (!file.is_open()) {
        std::cerr << "Error opening file: " << file_path << std::endl;
        return {std::nullopt, std::numeric_limits<int>::max()};
    }

    std::string line;
    int lineNumber = 0;
    int minDistance = std::numeric_limits<int>::max();
    std::optional<int> minLineNumber;

    while (getline(file, line)) {
        ++lineNumber;
        std::istringstream iss(line);
        std::string word;
        std::vector<int> word1Indices;
        std::vector<int> word2Indices;
        int index = 0;

        while (iss >> word) {
            if (word == word1) {
                word1Indices.push_back(index);
            } else if (word == word2) {
                word2Indices.push_back(index);
            }
            ++index;
        }

        for (int index1 : word1Indices) {
            for (int index2 : word2Indices) {
                int distance = std::abs(index1 - index2);
                if (distance < minDistance) {
                    minDistance = distance;
                    minLineNumber = lineNumber;
                }
            }
        }
    }

    return {minLineNumber, minDistance};
}
