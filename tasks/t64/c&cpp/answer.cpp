#include <fstream>
#include <sstream>
#include <vector>
#include <string>

static std::vector<std::string> split_csv_row(const std::string& line) {
    std::vector<std::string> row;
    std::istringstream stream(line);
    std::string cell;

    while (std::getline(stream, cell, ',')) {
        row.push_back(cell);
    }

    return row;
}

static bool first_three_match(const std::vector<std::string>& row, const std::vector<std::string>& rowCandidate) {
    if (row.size() < 3 || rowCandidate.size() < 3) {
        return false;
    }

    return row[0] == rowCandidate[0] && row[1] == rowCandidate[1] && row[2] == rowCandidate[2];
}

static bool has_matching_row(std::istream& reader, const std::vector<std::string>& rowCandidate) {
    std::string line;
    while (std::getline(reader, line)) {
        if (first_three_match(split_csv_row(line), rowCandidate)) {
            return true;
        }
    }

    return false;
}

void append_or_skip_row(std::fstream& fileHandler, std::istream& reader, const std::vector<std::string>& rowCandidate) {
    if (has_matching_row(reader, rowCandidate)) {
        return;
    }

    fileHandler.seekp(0, std::ios_base::end);
    for (size_t i = 0; i < rowCandidate.size(); ++i) {
        if (i > 0) {
                fileHandler << ",";
        }
        fileHandler << rowCandidate[i];
    }
    fileHandler << "\n";
    fileHandler.flush();
}
