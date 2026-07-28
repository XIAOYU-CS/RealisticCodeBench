class TempDir {
private:
    std::string path_;
public:
    TempDir() {
        std::string temp_path = fs::temp_directory_path().string() + "/test_temp_XXXXXX";
        #ifdef _WIN32
            path_ = fs::temp_directory_path().string() + "/test_temp_" + std::to_string(rand());
            fs::create_directory(path_);
        #else
            char* temp_cstr = new char[temp_path.length() + 1];
            std::strcpy(temp_cstr, temp_path.c_str());
            char* result = mkdtemp(temp_cstr);
            if (result) {
                path_ = std::string(result);
            } else {
                path_ = fs::temp_directory_path().string() + "/test_temp_default";
                fs::create_directory(path_);
            }
            delete[] temp_cstr;
        #endif
    }
    ~TempDir() {
        if (!path_.empty() && fs::exists(path_)) {
            fs::remove_all(path_);
        }
    }

    const std::string& path() const { return path_; }
};

class ResolvePathTestFixture {
public:
    TempDir temp_dir_;
    std::string test_file_;

    ResolvePathTestFixture() {
        test_file_ = temp_dir_.path() + "/test.txt";
        std::ofstream file(test_file_);
        file << "test content";
        file.close();
    }
};

TEST_CASE("Absolute path resolution", "[resolve_path]") {
    ResolvePathTestFixture fixture;

    SECTION("Test with system directories") {
        #ifdef _WIN32
            std::string result = resolve_path("C:\\Windows\\System32", "", false);
            REQUIRE(result == "C:\\Windows\\System32");
        #else
            std::string result = resolve_path("/etc", "", false);
            REQUIRE(result == fs::canonical("/etc").string());
        #endif
    }

    SECTION("Test non-existent absolute paths") {
        std::string test_path = "/non/existent/absolute/path";
        std::string result = resolve_path(test_path, "", false, false, true, true);

        #ifdef _WIN32
            REQUIRE_FALSE(result.empty());
        #else
            REQUIRE(result == test_path);
        #endif
    }
}

TEST_CASE("Relative path with base directory", "[resolve_path]") {
    ResolvePathTestFixture fixture;

    SECTION("Test simple relative path") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string result = resolve_path("test.txt", base_dir);

        fs::path expected = fs::absolute(base_dir) / "test.txt";
        expected = fs::canonical(expected);

        REQUIRE(result == expected.string());
    }

    SECTION("Test with subdirectory navigation") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string subdir = base_dir + "/subdir";
        fs::create_directories(subdir);

        std::string result = resolve_path("../test.txt", subdir);

        fs::path expected = fs::absolute(base_dir) / "test.txt";
        expected = fs::canonical(expected);

        REQUIRE(result == expected.string());
    }
}

TEST_CASE("User home expansion", "[resolve_path]") {
    SECTION("Test home directory expansion") {
        const char* home_dir = getenv("HOME");
        #ifdef _WIN32
            home_dir = getenv("USERPROFILE");
        #endif

        if (home_dir && fs::exists(home_dir)) {
            std::string result = resolve_path("~/Documents", "", false, false, true, true);
            if (!result.empty()) {
                REQUIRE(result.find("Documents") != std::string::npos);
            }
        }
    }
}

TEST_CASE("Path normalization", "[resolve_path]") {
    ResolvePathTestFixture fixture;

    SECTION("Test path with redundant navigation") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string result = resolve_path("./subdir/../test.txt", base_dir);

        fs::path expected = fs::absolute(base_dir) / "test.txt";
        expected = expected.lexically_normal();

        REQUIRE(result == expected.string());
    }
}

TEST_CASE("Existence checking", "[resolve_path]") {
    ResolvePathTestFixture fixture;

    SECTION("Test existing file with check_exists=true") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string result = resolve_path("test.txt", base_dir, true, true);
        REQUIRE_FALSE(result.empty());
        REQUIRE(fs::exists(result));
    }

    SECTION("Test non-existing file with check_exists=true") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string result = resolve_path("nonexistent.txt", base_dir, true, true);
        REQUIRE(result.empty());
    }

    SECTION("Test non-existing file with check_exists=false and allow_non_existent=true") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string result = resolve_path("nonexistent.txt", base_dir, true, false, true, true);
        REQUIRE_FALSE(result.empty());
    }

    SECTION("Test non-existing file with check_exists=false and allow_non_existent=false") {
        std::string base_dir = fixture.temp_dir_.path();
        std::string result = resolve_path("nonexistent.txt", base_dir, true, false, true, false);
        REQUIRE(result.empty());
    }
}

TEST_CASE("Edge cases and error handling", "[resolve_path]") {
    SECTION("Test empty path") {
        std::string result = resolve_path("");
        REQUIRE(result.empty());
    }

    SECTION("Test whitespace-only path") {
        std::string result = resolve_path("   ");
        REQUIRE(result.empty());
    }

    SECTION("Test invalid base directory") {
        std::string result = resolve_path("test.txt", "/invalid/nonexistent/directory");
        REQUIRE(result.empty());
    }
}
