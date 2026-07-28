#include <vector>

TEST_CASE("convert_binary_string_to_uint8_array", "[binary]") {
    SECTION("full byte binary string") {
        REQUIRE(convert_binary_string_to_uint8_array("11001010") == std::vector<unsigned char>{202});
    }

    SECTION("multiple full byte binary strings") {
        REQUIRE(convert_binary_string_to_uint8_array("1100101011110000") == std::vector<unsigned char>{202, 240});
    }

    SECTION("empty binary string") {
        REQUIRE(convert_binary_string_to_uint8_array("").empty());
    }

    SECTION("leading zeros") {
        REQUIRE(convert_binary_string_to_uint8_array("00101101") == std::vector<unsigned char>{45});
    }

    SECTION("end padding zeros") {
        REQUIRE(convert_binary_string_to_uint8_array("11001010000") == std::vector<unsigned char>{202, 0});
    }
}
