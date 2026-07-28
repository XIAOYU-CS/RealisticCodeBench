static std::vector<std::string> temp_files;

std::string create_temp_file(const std::string& content) {
    char filename[] = "tempXXXXXX";
    int fd = mkstemp(filename);
    if (fd == -1) {
        throw std::runtime_error("Failed to create temporary file");
    }
    std::ofstream file(filename);
    file << content;
    file.close();
    temp_files.push_back(filename);
    return filename;
}

void cleanup_temp_files() {
    for (const auto& filename : temp_files) {
        std::remove(filename.c_str());
    }
}

std::string capture_output(void (*func)(const std::vector<std::string>&, bool, bool, bool), 
                          const std::vector<std::string>& args, 
                          bool number_lines = false, 
                          bool show_ends = false, 
                          bool squeeze_blank = false) {
    std::ostringstream oss;
    std::streambuf* old_cout = std::cout.rdbuf(oss.rdbuf());
    func(args, number_lines, show_ends, squeeze_blank);
    std::cout.rdbuf(old_cout);
    return oss.str();
}

std::string capture_stderr(void (*func)(const std::vector<std::string>&, bool, bool, bool), 
                          const std::vector<std::string>& args, 
                          bool number_lines = false, 
                          bool show_ends = false, 
                          bool squeeze_blank = false) {
    std::ostringstream oss;
    std::streambuf* old_cerr = std::cerr.rdbuf(oss.rdbuf());
    func(args, number_lines, show_ends, squeeze_blank);
    std::cerr.rdbuf(old_cerr);
    return oss.str();
}

TEST_CASE("Basic file reading") {
    std::string content = "Hello World\nThis is a test\nThird line\n";
    std::string filename = create_temp_file(content);
    std::string output = capture_output(cat, {filename});
    REQUIRE(output == content);
    cleanup_temp_files();
}

TEST_CASE("Number lines option") {
    std::string content = "First line\nSecond line\nThird line\n";
    std::string filename = create_temp_file(content);
    std::string output = capture_output(cat, {filename}, true);
    std::string expected_output = "     1  First line\n     2  Second line\n     3  Third line\n";
    REQUIRE(output == expected_output);
    cleanup_temp_files();
}

TEST_CASE("Show ends option") {
    std::string content = "Line 1\nLine 2\nLine 3\n";
    std::string filename = create_temp_file(content);
    std::string output = capture_output(cat, {filename}, false, true);
    std::string expected_output = "Line 1$\nLine 2$\nLine 3$\n";
    REQUIRE(output == expected_output);
    cleanup_temp_files();
}

TEST_CASE("Squeeze blank option") {
    std::string content = "Line 1\n\n\n\nLine 2\n\nLine 3\n";
    std::string filename = create_temp_file(content);
    std::string output = capture_output(cat, {filename}, false, false, true);
    std::string expected_output = "Line 1\n\nLine 2\n\nLine 3\n";
    REQUIRE(output == expected_output);
    cleanup_temp_files();
}

TEST_CASE("File not found error") {
    std::string non_existent_file = "non_existent_file.txt";
    std::string error_output = capture_stderr(cat, {non_existent_file});
    REQUIRE(error_output.find("No such file or directory") != std::string::npos);
    REQUIRE(error_output.find(non_existent_file) != std::string::npos);
}
