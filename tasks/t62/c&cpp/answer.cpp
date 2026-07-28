#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <cstdlib>

static bool extract_metric(const std::string &line, const std::string &key, double &value) {
    size_t pos = line.find("\"" + key + "\"");
    if (pos == std::string::npos) {
        return false;
    }

    pos = line.find(':', pos);
    if (pos == std::string::npos) {
        return false;
    }

    const char *start = line.c_str() + pos + 1;
    char *end = nullptr;
    value = std::strtod(start, &end);
    return end != start;
}

std::pair<std::vector<double>, std::vector<double>> read_log(const std::string &log_file_path) {
    std::ifstream logFile(log_file_path);
    if (!logFile.is_open()) {
        throw std::runtime_error("Failed to open log file");
    }

    std::vector<double> train_loss_list;
    std::vector<double> test_acc1_list;

    std::string line;
    while (getline(logFile, line)) {
        double value = 0.0;
        if (extract_metric(line, "train_loss", value)) {
            train_loss_list.push_back(value);
        }
        if (extract_metric(line, "test_acc1", value)) {
            test_acc1_list.push_back(value);
        }
    }

    return {train_loss_list, test_acc1_list};
}
