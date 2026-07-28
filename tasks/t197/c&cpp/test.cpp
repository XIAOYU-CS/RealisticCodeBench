TEST_CASE("is_cpp_header_file") {
    SECTION("returns true for a .h file") {
        REQUIRE(is_cpp_header_file("example.h") == true);
    }

    SECTION("returns true for a .hpp file") {
        REQUIRE(is_cpp_header_file("example.hpp") == true);
    }

    SECTION("returns false for a non-header file extension") {
        REQUIRE(is_cpp_header_file("example.txt") == false);
    }

    SECTION("returns false for a file without an extension") {
        REQUIRE(is_cpp_header_file("example") == false);
    }

    SECTION("returns false for a .c file") {
        REQUIRE(is_cpp_header_file("example.c") == false);
    }
}