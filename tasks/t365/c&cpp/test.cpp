#include <chrono>
#include <fstream>
#include <system_error>

struct CwdUtilsFixture {
    fs::path original_cwd = fs::current_path();
    fs::path test_dir = fs::temp_directory_path() /
        ("t365_cwd_utils_" + std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()));

    CwdUtilsFixture() {
        fs::create_directories(test_dir);
        fs::current_path(test_dir);
        std::ofstream(test_dir / "file1.txt").close();
        std::ofstream(test_dir / "file2.py").close();
        fs::create_directory(test_dir / "test_dir");
        std::ofstream(test_dir / ".hidden_file").close();
        fs::create_directory(test_dir / ".hidden_dir");
    }

    ~CwdUtilsFixture() {
        std::error_code ignored;
        fs::current_path(original_cwd, ignored);
        fs::remove_all(test_dir, ignored);
    }
};

TEST_CASE("TestCwdUtils") {
    CwdUtilsFixture fixture;

    SECTION("test_get_current_directory") {
        auto result = cwd_utils("get", "string");
        REQUIRE(std::holds_alternative<std::string>(result));
        REQUIRE(std::get<std::string>(result) == fs::canonical(fs::current_path()).string());

        auto result_path = cwd_utils("get", "pathlib");
        REQUIRE(std::holds_alternative<fs::path>(result_path));
        REQUIRE(std::get<fs::path>(result_path) == fs::canonical(fs::current_path()));
    }

    SECTION("test_get_directory_permissions") {
        auto result = cwd_utils("permissions", "");
        REQUIRE(std::holds_alternative<std::map<std::string, bool>>(result));
        auto permissions = std::get<std::map<std::string, bool>>(result);
        REQUIRE(permissions.count("read") > 0);
        REQUIRE(permissions.count("write") > 0);
        REQUIRE(permissions.count("execute") > 0);
        REQUIRE(permissions.count("exists") > 0);

        REQUIRE(permissions["exists"]);
        REQUIRE(permissions["read"]);
        REQUIRE(permissions["write"]);
    }

    SECTION("test_list_directory_contents") {
        auto result = cwd_utils("list", "string", true, false);
        REQUIRE(std::holds_alternative<std::map<std::string, std::vector<std::string>>>(result));
        auto contents = std::get<std::map<std::string, std::vector<std::string>>>(result);
        REQUIRE(contents.count("directories") > 0);
        REQUIRE(contents.count("files") > 0);

        auto dirs = contents["directories"];
        auto files = contents["files"];
        REQUIRE(std::find(dirs.begin(), dirs.end(), "test_dir") != dirs.end());
        REQUIRE(std::find(dirs.begin(), dirs.end(), ".hidden_dir") == dirs.end());
        REQUIRE(std::find(files.begin(), files.end(), "file1.txt") != files.end());
        REQUIRE(std::find(files.begin(), files.end(), "file2.py") != files.end());
        REQUIRE(std::find(files.begin(), files.end(), ".hidden_file") == files.end());
    }

    SECTION("test_list_directory_contents_with_hidden") {
        auto result = cwd_utils("list", "string", true, true);
        REQUIRE(std::holds_alternative<std::map<std::string, std::vector<std::string>>>(result));
        auto contents = std::get<std::map<std::string, std::vector<std::string>>>(result);

        auto dirs = contents["directories"];
        auto files = contents["files"];
        REQUIRE(std::find(dirs.begin(), dirs.end(), "test_dir") != dirs.end());
        REQUIRE(std::find(dirs.begin(), dirs.end(), ".hidden_dir") != dirs.end());
        REQUIRE(std::find(files.begin(), files.end(), "file1.txt") != files.end());
        REQUIRE(std::find(files.begin(), files.end(), "file2.py") != files.end());
        REQUIRE(std::find(files.begin(), files.end(), ".hidden_file") != files.end());
    }

    SECTION("test_change_directory") {
        fs::path sub_dir = fixture.test_dir / "sub_directory";
        fs::create_directory(sub_dir);

        auto result = cwd_utils("change", "string", true, false, "name", sub_dir.string());
        REQUIRE(std::holds_alternative<bool>(result));
        REQUIRE(std::get<bool>(result));
        REQUIRE(fs::canonical(fs::current_path()) == fs::canonical(sub_dir));

        result = cwd_utils("change", "string", true, false, "name", "/non/existent/directory");
        REQUIRE(std::holds_alternative<std::nullopt_t>(result));
    }
}
