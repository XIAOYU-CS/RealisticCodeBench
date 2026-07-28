#include <fstream>
#include <string>
#include <vector>

void write_csv_to_file(const std::vector<std::string>& strings, const std::string& file_path) {
    std::ofstream file(file_path);
    for (std::size_t i = 0; i < strings.size(); ++i) {
        if (i != 0) {
            file << ',';
        }
        file << strings[i];
    }
}
