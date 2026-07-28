TEST_CASE("TestFormatTimestampToString", "[unix_timestamp_to_formatted_local_datetime]") {
    SECTION("test_basic_functionality") {
        double timestamp = 1655364000.0;
        std::string expected_date_str = "Thu Jun 16 03:20:00 PM +0800 2022";
        REQUIRE(unix_timestamp_to_formatted_local_datetime(timestamp) == expected_date_str);
    }

    SECTION("test_default_format") {
        double timestamp = 1655364000.0;
        std::string expected_date_str = "Thu Jun 16 03:20:00 PM +0800 2022";
        REQUIRE(unix_timestamp_to_formatted_local_datetime(timestamp) == expected_date_str);
    }

    SECTION("test_explicit_null_format") {
        double timestamp = 1655364000.0;
        std::string expected_date_str = "Thu Jun 16 03:20:00 PM +0800 2022";
        REQUIRE(unix_timestamp_to_formatted_local_datetime(timestamp, std::nullopt) == expected_date_str);
    }

    SECTION("test_custom_format") {
        double timestamp = 1655364000.0;
        std::string custom_format = "%Y-%m-%d %H:%M:%S";
        std::string expected_date_str = "2022-06-16 15:20:00";
        REQUIRE(unix_timestamp_to_formatted_local_datetime(timestamp, custom_format) == expected_date_str);
    }

    SECTION("test_edge_case_boundary_value") {
        double timestamp = 0.0;
        std::string expected_date_str = "Thu Jan 01 08:00:00 AM +0800 1970";
        REQUIRE(unix_timestamp_to_formatted_local_datetime(timestamp) == expected_date_str);
    }
}
