#include <fstream>
#include <string>
#include <utility>

#include <unistd.h>

static std::string write_temp_file(const std::string& name, const std::string& content) {
    std::string path = "/tmp/realistic-code-t91-" + std::to_string(getpid()) + "-" + name + ".txt";
    std::ofstream file(path);
    file << content;
    file.close();
    return path;
}

TEST_CASE("Test Get Min Distance") {
    SECTION("Simple case") {
        std::string path = write_temp_file("simple", "hello world\nhello hello world\nworld hello\n");
        REQUIRE(get_min_distance(path, "hello", "world") == std::make_pair(0, 1));
        std::remove(path.c_str());
    }

    SECTION("Multiple lines") {
        std::string path = write_temp_file("multiple", "hello planet\nworld hello planet\nhello world planet\n");
        REQUIRE(get_min_distance(path, "hello", "world") == std::make_pair(1, 1));
        std::remove(path.c_str());
    }

    SECTION("Large distance") {
        std::string path = write_temp_file("large", "hello a b c d e f g h i j k l m n o p q r s t u v w x y z world\n");
        REQUIRE(get_min_distance(path, "hello", "world") == std::make_pair(0, 27));
        std::remove(path.c_str());
    }

    SECTION("Adjacent words") {
        std::string path = write_temp_file("adjacent", "hello world\nhello hello world world\nworld hello\n");
        REQUIRE(get_min_distance(path, "hello", "world") == std::make_pair(0, 1));
        std::remove(path.c_str());
    }

    SECTION("No line contains both words") {
        std::string path = write_temp_file("missing", "hello planet\nworld galaxy\n");
        REQUIRE(get_min_distance(path, "hello", "world") == std::make_pair(-1, -1));
        std::remove(path.c_str());
    }
}
