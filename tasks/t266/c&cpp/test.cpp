#include <cstdio>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

struct TestAnswer {
    const std::string test_file_path = "test_output.csv";

    ~TestAnswer() {
        std::remove(test_file_path.c_str());
    }

    std::string read_file(const std::string& file_path) const {
        std::ifstream file(file_path);
        std::ostringstream buffer;
        buffer << file.rdbuf();
        return buffer.str();
    }
};

TEST_CASE("write_csv_to_file") {
    TestAnswer helper;

    SECTION("multiple strings") {
        std::vector<std::string> data = {"Apple", "Banana", "Cherry"};
        write_csv_to_file(data, helper.test_file_path);
        std::string content = helper.read_file(helper.test_file_path);
        REQUIRE(content == "Apple,Banana,Cherry");
    }

    SECTION("single string") {
        std::vector<std::string> data = {"Apple"};
        write_csv_to_file(data, helper.test_file_path);
        std::string content = helper.read_file(helper.test_file_path);
        REQUIRE(content == "Apple");
    }

    SECTION("empty list") {
        std::vector<std::string> data = {};
        write_csv_to_file(data, helper.test_file_path);
        std::string content = helper.read_file(helper.test_file_path);
        REQUIRE(content == "");
    }

    SECTION("special characters") {
        std::vector<std::string> data = {"Apple", "Banana, Cherry", "Date"};
        write_csv_to_file(data, helper.test_file_path);
        std::string content = helper.read_file(helper.test_file_path);
        REQUIRE(content == "Apple,Banana, Cherry,Date");
    }

    SECTION("spaces") {
        std::vector<std::string> data = {"Apple ", " Banana", " Cherry "};
        write_csv_to_file(data, helper.test_file_path);
        std::string content = helper.read_file(helper.test_file_path);
        REQUIRE(content == "Apple , Banana, Cherry ");
    }

    SECTION("file overwrite") {
        std::vector<std::string> first_data = {"Apple", "Banana"};
        write_csv_to_file(first_data, helper.test_file_path);

        std::vector<std::string> second_data = {"Cherry", "Date"};
        write_csv_to_file(second_data, helper.test_file_path);

        std::string content = helper.read_file(helper.test_file_path);
        REQUIRE(content == "Cherry,Date");
    }
}
