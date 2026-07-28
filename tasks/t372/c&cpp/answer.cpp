
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <stdexcept>

void cat(const std::vector<std::string>& filenames, bool number_lines = false, bool show_ends = false, bool squeeze_blank = false) {
    for (const auto& filename : filenames) {
        try {
            std::ifstream file(filename);
            if (!file.is_open()) {
                throw std::runtime_error("No such file or directory");
            }

            std::string line;
            int line_num = 1;
            bool last_blank = false;

            while (std::getline(file, line)) {
                bool current_blank = line.empty();
                if (squeeze_blank && current_blank && last_blank) {
                    continue;
                }
                last_blank = current_blank;

                if (number_lines) {
                    std::cout.width(6);
                    std::cout << std::right << line_num << "  ";
                    line_num++;
                }

                if (show_ends) {
                    std::cout << line << "$" << std::endl;
                } else {
                    std::cout << line << std::endl;
                }
            }
        } catch (const std::exception& e) {
            std::cerr << "cat: " << filename << ": " << e.what() << std::endl;
        }
    }
}
