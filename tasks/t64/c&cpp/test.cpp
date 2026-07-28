#include <cstdio>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

static std::vector<std::vector<std::string>> read_rows(const std::string& path) {
    std::ifstream file(path);
    std::vector<std::vector<std::string>> rows;
    std::string line;

    while (std::getline(file, line)) {
        std::vector<std::string> row;
        std::stringstream stream(line);
        std::string cell;
        while (std::getline(stream, cell, ',')) {
            row.push_back(cell);
        }
        rows.push_back(row);
    }

    return rows;
}

static int count_prefix(const std::vector<std::vector<std::string>>& rows, const std::vector<std::string>& prefix) {
    int count = 0;
    for (const auto& row : rows) {
        if (row.size() >= 3 && row[0] == prefix[0] && row[1] == prefix[1] && row[2] == prefix[2]) {
            ++count;
        }
    }
    return count;
}

static void write_seed_file(const std::string& path) {
    std::ofstream file(path);
    file << "Alice,30,USA\n";
    file << "Bob,25,UK\n";
    file << "Charlie,35,Canada\n";
}

TEST_CASE("append_or_skip_row", "[csv]") {
    const std::string path = "t64_cpp_temp.csv";
    write_seed_file(path);

    SECTION("appends a new row") {
        std::fstream file(path, std::ios::in | std::ios::out);
        std::ifstream reader(path);
        append_or_skip_row(file, reader, {"David", "28", "Australia"});

        auto rows = read_rows(path);
        REQUIRE(rows.back() == std::vector<std::string>{"David", "28", "Australia"});
    }

    SECTION("skips when the first three columns match") {
        std::fstream file(path, std::ios::in | std::ios::out);
        std::ifstream reader(path);
        append_or_skip_row(file, reader, {"Alice", "30", "USA", "Engineer"});

        auto rows = read_rows(path);
        REQUIRE(count_prefix(rows, {"Alice", "30", "USA"}) == 1);
    }

    SECTION("appends when one of the first three columns differs") {
        std::fstream file(path, std::ios::in | std::ios::out);
        std::ifstream reader(path);
        append_or_skip_row(file, reader, {"Alice", "31", "USA"});

        auto rows = read_rows(path);
        REQUIRE(rows.back() == std::vector<std::string>{"Alice", "31", "USA"});
    }

    SECTION("appends rows with extra columns") {
        std::fstream file(path, std::ios::in | std::ios::out);
        std::ifstream reader(path);
        append_or_skip_row(file, reader, {"Eve", "40", "Australia", "Engineer"});

        auto rows = read_rows(path);
        REQUIRE(rows.back() == std::vector<std::string>{"Eve", "40", "Australia", "Engineer"});
    }

    SECTION("supports multiple appends with refreshed readers") {
        std::fstream first_file(path, std::ios::in | std::ios::out);
        std::ifstream first_reader(path);
        append_or_skip_row(first_file, first_reader, {"Frank", "29", "Germany"});
        first_file.close();
        first_reader.close();

        std::fstream second_file(path, std::ios::in | std::ios::out);
        std::ifstream second_reader(path);
        append_or_skip_row(second_file, second_reader, {"Grace", "22", "France"});

        auto rows = read_rows(path);
        REQUIRE(rows[rows.size() - 2] == std::vector<std::string>{"Frank", "29", "Germany"});
        REQUIRE(rows.back() == std::vector<std::string>{"Grace", "22", "France"});
    }

    std::remove(path.c_str());
}
