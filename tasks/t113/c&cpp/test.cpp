#include <tuple>

TEST_CASE("convert_range_to_color_yellow_green_change behavior", "[convert_range_to_color_yellow_green_change]") {
    SECTION("red endpoint") {
        REQUIRE(convert_range_to_color_yellow_green_change(0.0) == std::make_tuple(255.0, 127.5, 127.5));
    }

    SECTION("yellow midpoint") {
        REQUIRE(convert_range_to_color_yellow_green_change(0.5) == std::make_tuple(255.0, 255.0, 127.5));
    }

    SECTION("green endpoint") {
        REQUIRE(convert_range_to_color_yellow_green_change(1.0) == std::make_tuple(0.0, 255.0, 127.5));
    }

    SECTION("first transition") {
        REQUIRE(convert_range_to_color_yellow_green_change(0.25) == std::make_tuple(255.0, 191.0, 127.5));
    }

    SECTION("second transition") {
        REQUIRE(convert_range_to_color_yellow_green_change(0.75) == std::make_tuple(127.0, 255.0, 127.5));
    }
}
