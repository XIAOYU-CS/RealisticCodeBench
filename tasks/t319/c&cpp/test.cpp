#include <map>
#include <string>
#include <vector>

using Result = std::map<std::string, std::string>;

TEST_CASE("Test evaluate_command function", "[evaluate_command]") {
    Config test_config = {
        {"network", "database", "ui", "security"},
        {
            {{"connect", "disconnect", "ping"}, {"network"}},
            {{"select", "insert", "update", "delete"}, {"database"}},
            {{"login", "logout", "password"}, {"security", "ui"}},
            {{"show", "display"}, {"ui"}}
        }
    };

    SECTION("Test normal keyword matching functionality") {
        std::string command = "Connect to the database server";
        Result result = evaluate_command(command, test_config);

        Result expected = {
            {"network", "yes"},
            {"database", "no"},
            {"ui", "no"},
            {"security", "no"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Test that a single command can activate multiple modules") {
        std::string command = "User login with password verification";
        Result result = evaluate_command(command, test_config);

        Result expected = {
            {"network", "no"},
            {"database", "no"},
            {"ui", "yes"},
            {"security", "yes"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Test that keyword matching is case-insensitive") {
        std::string command = "SELECT * FROM users WHERE ID = 1";
        Result result = evaluate_command(command, test_config);

        Result expected = {
            {"network", "no"},
            {"database", "yes"},
            {"ui", "no"},
            {"security", "no"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Test behavior when no keywords match") {
        std::string command = "Calculate the sum of numbers";
        Result result = evaluate_command(command, test_config);

        Result expected = {
            {"network", "no"},
            {"database", "no"},
            {"ui", "no"},
            {"security", "no"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Test behavior with empty command string") {
        std::string command = "";
        Result result = evaluate_command(command, test_config);

        Result expected = {
            {"network", "no"},
            {"database", "no"},
            {"ui", "no"},
            {"security", "no"}
        };

        REQUIRE(result == expected);
    }
}
