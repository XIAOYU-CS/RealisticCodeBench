#include "signature.cpp"

#include <climits>
#include <cstdlib>
#include <fstream>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

std::pair<int, int> get_min_distance(const std::string& file_path, const std::string& word1, const std::string& word2) {
    std::ifstream file(file_path);
    std::string line;
    int best_line = -1;
    int best_distance = INT_MAX;

    for (int line_number = 0; std::getline(file, line); ++line_number) {
        std::istringstream words(line);
        std::string word;
        std::vector<int> word1_indices;
        std::vector<int> word2_indices;

        for (int index = 0; words >> word; ++index) {
            if (word == word1) {
                word1_indices.push_back(index);
            } else if (word == word2) {
                word2_indices.push_back(index);
            }
        }

        for (int i : word1_indices) {
            for (int j : word2_indices) {
                int distance = std::abs(i - j);
                if (distance < best_distance) {
                    best_distance = distance;
                    best_line = line_number;
                }
            }
        }
    }

    return best_line == -1 ? std::make_pair(-1, -1) : std::make_pair(best_line, best_distance);
}
