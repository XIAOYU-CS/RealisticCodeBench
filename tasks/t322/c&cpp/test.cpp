TEST_CASE("invoke creates a 64-bit breakpoint") {
    GdbEnvironment::clear();
    GdbEnvironment::setMemory("0x1000", "0x2000");

    auto result = invoke("0x1000 1 8", false);

    REQUIRE(result.success.size() == 1);
    REQUIRE(result.failed.empty());
    REQUIRE(result.success[0] == std::make_pair(std::string("0x2000"), 1));
}

TEST_CASE("invoke creates a 32-bit breakpoint") {
    GdbEnvironment::clear();
    GdbEnvironment::setMemory("0x1000", "0x2000");

    auto result = invoke("0x1000 1 4", false);

    REQUIRE(result.success.size() == 1);
    REQUIRE(result.failed.empty());
    REQUIRE(result.success[0] == std::make_pair(std::string("0x2000"), 1));
}

TEST_CASE("invoke rejects unsupported step size") {
    GdbEnvironment::clear();

    REQUIRE_THROWS_AS(invoke("0x1000 1 6", false), GdbError);
    REQUIRE_THROWS_WITH(invoke("0x1000 1 6", false),
        "Unsupported step size 6. Use 4 (32-bit) or 8 (64-bit)");
}

TEST_CASE("invoke records memory read format failures") {
    GdbEnvironment::clear();
    GdbEnvironment::executeMock = [](const std::string&, bool) {
        return std::string("Invalid format");
    };

    auto result = invoke("0x1000 1 8", false);

    REQUIRE(result.success.empty());
    REQUIRE(result.failed.size() == 1);
    REQUIRE(result.failed[0].first == "0x1000");
    REQUIRE(result.failed[0].second.find("Unexpected memory output format") != std::string::npos);
}

TEST_CASE("invoke records breakpoint creation failures") {
    GdbEnvironment::clear();
    int call_count = 0;
    GdbEnvironment::executeMock = [&call_count](const std::string&, bool) {
        ++call_count;
        if (call_count == 1) {
            return std::string("0x1000: 0x2000");
        }
        return std::string("Error setting breakpoint");
    };

    auto result = invoke("0x1000 1 8", false);

    REQUIRE(result.success.empty());
    REQUIRE(result.failed.size() == 1);
    REQUIRE(result.failed[0].first == "0x1000");
    REQUIRE(result.failed[0].second.find("Breakpoint command failed") != std::string::npos);
}
