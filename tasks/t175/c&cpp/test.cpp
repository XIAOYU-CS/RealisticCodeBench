TEST_CASE("is_valid_port_number") {
    SECTION("returns true for a valid port number in the middle of the range") {
        REQUIRE(is_valid_port_number(8080) == true);
    }

    SECTION("returns true for the lowest valid port number") {
        REQUIRE(is_valid_port_number(1) == true);
    }

    SECTION("returns true for the highest valid port number") {
        REQUIRE(is_valid_port_number(65535) == true);
    }

    SECTION("returns false for a port number below the valid range") {
        REQUIRE(is_valid_port_number(0) == false);
    }

    SECTION("returns false for a port number above the valid range") {
        REQUIRE(is_valid_port_number(65536) == false);
    }
}
