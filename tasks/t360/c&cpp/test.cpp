TEST_CASE("Test generating package name from normal game name") {
    REQUIRE(generate_package_name("My Awesome Game") == std::optional<std::string>("com.my.awesome.game"));
}

TEST_CASE("Test handling special characters and various separators") {
    REQUIRE(generate_package_name("My-Game_Test 2023!") == std::optional<std::string>("com.my.game.test.2023"));
}

TEST_CASE("Test prepending 'app' when leading number is not allowed") {
    REQUIRE(generate_package_name("123GameAdventure") == std::optional<std::string>("com.app.123gameadventure"));
}

TEST_CASE("Test allowing leading number when configured") {
    REQUIRE(generate_package_name("123Game", {
        {"allowLeadingNumber", true}
    }) == std::optional<std::string>("com.123game"));
}

TEST_CASE("Test using custom prefix and separator") {
    REQUIRE(generate_package_name("My Game App", {
        {"prefix", "org.games."},
        {"separator", "_"},
        {"allowLeadingNumber", true}
    }) == std::optional<std::string>("org.games.my_game_app"));
}

TEST_CASE("Test returning None for empty or invalid input") {
    REQUIRE(generate_package_name("") == std::nullopt);
    REQUIRE(generate_package_name("   ") == std::nullopt);
    REQUIRE(generate_package_name("!@#$%") == std::nullopt);
}

TEST_CASE("Test additional edge cases") {
    REQUIRE(generate_package_name("!@#$%^&*()") == std::nullopt);

    REQUIRE(generate_package_name("MyAwesomeGame") == std::optional<std::string>("com.myawesomegame"));
    REQUIRE(generate_package_name("My---Game___Test") == std::optional<std::string>("com.my.game.test"));
}
