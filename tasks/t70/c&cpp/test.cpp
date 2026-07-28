#include <filesystem>
#include <stdexcept>
#include <string>

TEST_CASE("TestExtractTextFromPDF", "[PDF]") {
    SECTION("test_empty_file") {
        std::string pdf_path = R"(E:\code\code_back\python_project\RealisticEval-Data\envs\python\test_case\t249\testcase01.pdf)";
        std::string expected = " \n";
        std::string output = extract_text_from_pdf(pdf_path);
        REQUIRE(output == expected);
    }

    SECTION("test_normal_file") {
        std::string pdf_path = R"(E:\code\code_back\python_project\RealisticEval-Data\envs\python\test_case\t249\testcase02.pdf)";
        std::string expected = "11111  \n";
        std::string output = extract_text_from_pdf(pdf_path);
        REQUIRE(output == expected);
    }

    SECTION("test_more_text_file") {
        std::string pdf_path = R"(E:\code\code_back\python_project\RealisticEval-Data\envs\python\test_case\t249\testcase03.pdf)";
        std::string expected = "11111  \n22222  \n33333  \n44444  \n";
        std::string output = extract_text_from_pdf(pdf_path);
        REQUIRE(output == expected);
    }

    SECTION("test_file_path_with_spaces") {
        namespace fs = std::filesystem;
        fs::path fixture = fs::current_path() / "envs" / "python" / "test_case" / "t249" / "testcase02.pdf";
        if (!fs::exists(fixture)) {
            fixture = fs::current_path() / "final_realistic_code_bench" / "envs" / "python" / "test_case" / "t249" / "testcase02.pdf";
        }
        fs::path pdf_path = fs::temp_directory_path() / "t70 fixture with spaces.pdf";
        fs::copy_file(fixture, pdf_path, fs::copy_options::overwrite_existing);
        REQUIRE(extract_text_from_pdf(pdf_path.string()) == "11111  \n");
        fs::remove(pdf_path);
    }

    SECTION("test_missing_file_throws") {
        REQUIRE_THROWS_AS(extract_text_from_pdf("envs/python/test_case/t249/missing.pdf"), std::runtime_error);
    }
}
