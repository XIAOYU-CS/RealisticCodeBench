TEST_CASE("Test IsCompliantIP", "[is_compliant_ip]") {
    SECTION("Private IP") {
        REQUIRE(is_compliant_ip("192.168.1.1"));
    }

    SECTION("Public IP") {
        REQUIRE_FALSE(is_compliant_ip("8.8.8.8"));
    }

    SECTION("Invalid IP") {
        REQUIRE_FALSE(is_compliant_ip("999.999.999.999"));
    }

     SECTION("10.x.x.x Private IP") {
        REQUIRE(is_compliant_ip("10.0.0.1"));
        REQUIRE(is_compliant_ip("10.255.255.254"));
    }

    SECTION("172.16.x.x - 172.31.x.x Private IP") {
        REQUIRE(is_compliant_ip("172.16.0.1"));
        REQUIRE(is_compliant_ip("172.31.255.255"));
        REQUIRE_FALSE(is_compliant_ip("172.15.255.255"));
        REQUIRE_FALSE(is_compliant_ip("172.32.0.0"));
    }

    SECTION("Loopback and Link-local IPs are non-compliant") {
        REQUIRE_FALSE(is_compliant_ip("127.0.0.1"));
        REQUIRE_FALSE(is_compliant_ip("169.254.1.1"));
    }

    SECTION("Malformed or Edge-case Strings") {
        REQUIRE_FALSE(is_compliant_ip("192.168.1"));
        REQUIRE_FALSE(is_compliant_ip("192.168.1.1.1"));
        REQUIRE_FALSE(is_compliant_ip("192.168.-1.1"));
        REQUIRE_FALSE(is_compliant_ip("192.168.01.1"));
        REQUIRE_FALSE(is_compliant_ip(""));
    }
}
