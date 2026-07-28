TEST_CASE("convert_bytes_to_human_readable") {
    SECTION("should convert bytes to KB correctly") {
        REQUIRE(convert_bytes_to_human_readable(1024) == "1.00 KB");
        REQUIRE(convert_bytes_to_human_readable(2048) == "2.00 KB");
    }

    SECTION("should convert bytes to MB correctly") {
        REQUIRE(convert_bytes_to_human_readable(1048576) == "1.00 MB");
        REQUIRE(convert_bytes_to_human_readable(2097152) == "2.00 MB");
    }

    SECTION("should convert bytes to GB correctly") {
        REQUIRE(convert_bytes_to_human_readable(1073741824) == "1.00 GB");
        REQUIRE(convert_bytes_to_human_readable(2147483648) == "2.00 GB");
    }

    SECTION("should convert bytes to TB correctly") {
        REQUIRE(convert_bytes_to_human_readable(1099511627776) == "1.00 TB");
        REQUIRE(convert_bytes_to_human_readable(2199023255552) == "2.00 TB");
    }

    SECTION("should keep byte-scale values in bytes") {
        REQUIRE(convert_bytes_to_human_readable(0) == "0 Byte");
        REQUIRE(convert_bytes_to_human_readable(1) == "1.00 Bytes");
        REQUIRE(convert_bytes_to_human_readable(1023) == "1023.00 Bytes");
    }
}
