TEST_CASE("Test Get Local IP", "[get_windows_local_ip]") {
    SECTION("Local IP Found") {
        set_ipconfig_output_for_test("192.168.1.10\n");

        OptionalString result = get_windows_local_ip();
        REQUIRE(result.has_value());
        REQUIRE(*result == "192.168.1.10");

        clear_ipconfig_output_for_test();
    }

    SECTION("No Local IP Found") {
        set_ipconfig_output_for_test("10.0.0.5\n");

        OptionalString result = get_windows_local_ip();
        REQUIRE(!result.has_value());

        clear_ipconfig_output_for_test();
    }

    SECTION("Multiple IPs Found") {
        set_ipconfig_output_for_test("10.0.0.5\n192.168.1.10\n");

        OptionalString result = get_windows_local_ip();
        REQUIRE(result.has_value());
        REQUIRE(*result == "192.168.1.10");

        clear_ipconfig_output_for_test();
    }

    SECTION("Invalid Command") {
        set_ipconfig_output_for_test("");

        OptionalString result = get_windows_local_ip();
        REQUIRE(!result.has_value());

        clear_ipconfig_output_for_test();
    }

    SECTION("Unexpected Error") {
        set_ipconfig_output_for_test("");

        OptionalString result = get_windows_local_ip();
        REQUIRE(!result.has_value());

        clear_ipconfig_output_for_test();
    }
}
