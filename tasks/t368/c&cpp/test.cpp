#include <string>
#include <vector>

TEST_CASE("command_shell_safe behavior", "[command_shell_safe]") {
    SECTION("rejects empty arguments") {
        auto result = command_shell_safe({});
        REQUIRE(result.at("status") == "error");
        REQUIRE(result.at("result") == "[invalid argument]");
    }

    SECTION("captures stdout from a successful command") {
        auto result = command_shell_safe({"echo", "hello"});
        REQUIRE(result.at("status") == "success");
        REQUIRE(result.at("result") == "hello");
    }

    SECTION("reports success when a command has no output") {
#ifdef _WIN32
        auto result = command_shell_safe({"type", "nul"});
#else
        auto result = command_shell_safe({"true"});
#endif
        REQUIRE(result.at("status") == "success");
        REQUIRE(result.at("result") == "[command succeeded with no output]");
    }

    SECTION("reports nonzero exit status") {
        auto result = command_shell_safe({"definitely_not_a_real_command_t368"});
        REQUIRE(result.at("status") == "error");
        REQUIRE(result.at("result").find("[execution failed]") != std::string::npos);
        REQUIRE(result.at("result").find("Exit code:") != std::string::npos);
    }

    SECTION("times out a long-running command") {
#ifdef _WIN32
        auto result = command_shell_safe({"ping", "127.0.0.1", "-n", "4"}, 1);
#else
        auto result = command_shell_safe({"sleep", "2"}, 1);
#endif
        REQUIRE(result.at("status") == "error");
        REQUIRE(result.at("result") == "[error] Command timed out.");
    }

    SECTION("keeps multiple output words") {
        auto result = command_shell_safe({"echo", "hello", "world"});
        REQUIRE(result.at("status") == "success");
        REQUIRE(result.at("result") == "hello world");
    }
}
