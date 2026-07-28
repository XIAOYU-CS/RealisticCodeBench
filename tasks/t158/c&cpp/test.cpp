#include <regex>
#include <string>

TEST_CASE("create_36_char_uuid") {

    SECTION("should return a string") {
        std::string result = create_36_char_uuid();
        REQUIRE(!result.empty());
    }

    SECTION("should return a string of length 36") {
        std::string result = create_36_char_uuid();
        REQUIRE(result.length() == 36);
    }

    SECTION("should generate different UUIDs on consecutive calls") {
        std::string uuid1 = create_36_char_uuid();
        std::string uuid2 = create_36_char_uuid();
        REQUIRE(uuid1 != uuid2);
    }

    SECTION("should generate UUIDs that include uppercase") {
        std::string result = create_36_char_uuid();
        REQUIRE(std::regex_search(result, std::regex("[A-Z]")));
    }

    SECTION("should generate UUIDs that include lowercase letters") {
        std::string result = create_36_char_uuid();
        REQUIRE(std::regex_search(result, std::regex("[a-z]")));
    }

    SECTION("should generate UUIDs that include digits") {
        std::string result = create_36_char_uuid();
        REQUIRE(std::regex_search(result, std::regex("[0-9]")));
    }
}
