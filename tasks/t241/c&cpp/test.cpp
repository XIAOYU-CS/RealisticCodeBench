TEST_CASE("Basic functionality with normal inputs", "[thread_count_to_formatted_string]") {
    SECTION("Test singular case") {
        REQUIRE(thread_count_to_formatted_string(1) == "1 Thread");
    }

    SECTION("Test plural case") {
        REQUIRE(thread_count_to_formatted_string(5) == "5 Threads");
    }

    SECTION("Test zero case") {
        REQUIRE(thread_count_to_formatted_string(0) == "No Threads");
    }
}

TEST_CASE("Zero padding functionality", "[thread_count_to_formatted_string]") {
    SECTION("Test with default padding (2)") {
        REQUIRE(thread_count_to_formatted_string(5, 2, true) == "05 Threads");
    }

    SECTION("Test with custom padding") {
        REQUIRE(thread_count_to_formatted_string(5, 3, true) == "005 Threads");
    }

    SECTION("Test with use_zero_pad=false") {
        REQUIRE(thread_count_to_formatted_string(5, 2, false) == "5 Threads");
    }
}

TEST_CASE("Thousands separator functionality", "[thread_count_to_formatted_string]") {
    SECTION("Test with thousands separator") {
        REQUIRE(thread_count_to_formatted_string(1000, 2, false, true) == "1,000 Threads");
    }

    SECTION("Test thousands separator takes precedence over zero padding") {
        REQUIRE(thread_count_to_formatted_string(1000, 2, true, true) == "1,000 Threads");
    }
}

TEST_CASE("Custom text parameters", "[thread_count_to_formatted_string]") {
    SECTION("Test custom zero string") {
        REQUIRE(thread_count_to_formatted_string(0, 2, false, false, "Zero Threads") == "Zero Threads");
    }

    SECTION("Test custom singular and plural forms") {
        REQUIRE(thread_count_to_formatted_string(1, 2, false, false, "No Threads", "Proceso", "Procesos") == "1 Proceso");
        REQUIRE(thread_count_to_formatted_string(3, 2, false, false, "No Threads", "Proceso", "Procesos") == "3 Procesos");
    }
}

TEST_CASE("Error handling for invalid inputs", "[thread_count_to_formatted_string]") {
    SECTION("Test negative number") {
        REQUIRE_THROWS_AS(thread_count_to_formatted_string(-1), std::invalid_argument);
    }

    SECTION("Test invalid string input") {
        REQUIRE_THROWS_AS(thread_count_to_formatted_string("invalid"), std::invalid_argument);
    }

    SECTION("Test empty string input") {
        REQUIRE_THROWS_AS(thread_count_to_formatted_string(""), std::invalid_argument);
    }

    SECTION("Test string with invalid characters") {
        REQUIRE_THROWS_AS(thread_count_to_formatted_string("123abc"), std::invalid_argument);
    }
}

TEST_CASE("String input version tests", "[thread_count_to_formatted_string]") {
    SECTION("Valid string inputs") {
        REQUIRE(thread_count_to_formatted_string("1") == "1 Thread");
        REQUIRE(thread_count_to_formatted_string("5") == "5 Threads");
        REQUIRE(thread_count_to_formatted_string("0") == "No Threads");
    }

    SECTION("Invalid string inputs") {
        REQUIRE_THROWS_AS(thread_count_to_formatted_string("invalid"), std::invalid_argument);
        REQUIRE_THROWS_AS(thread_count_to_formatted_string("-1"), std::invalid_argument);
        REQUIRE_THROWS_AS(thread_count_to_formatted_string(""), std::invalid_argument);
    }
}

TEST_CASE("Parameterized test for different counts", "[thread_count_to_formatted_string][!mayfail]") {
    auto [input, expected] = GENERATE(table<int, std::string>({
        {1, "1 Thread"},
        {2, "2 Threads"},
        {5, "5 Threads"},
        {10, "10 Threads"},
        {0, "No Threads"}
    }));

    SECTION("Testing count: " + std::to_string(input)) {
        REQUIRE(thread_count_to_formatted_string(input) == expected);
    }
}
