TEST_CASE("get_current_date_formatted ", "[date]") {
    std::time_t t = std::time(nullptr);
    std::tm* currentTime = std::localtime(&t);
    char month[32];
    std::strftime(month, sizeof(month), "%B", currentTime);
    std::string expected = std::string(month) + " " + std::to_string(currentTime->tm_mday) + ", " + std::to_string(currentTime->tm_year + 1900);
    std::string result = get_current_date_formatted ();

    SECTION("returns date in 'Month Day, Year' format") {
        REQUIRE(result == expected);
    }

    SECTION("returns correct year") {
        REQUIRE(result.find(std::to_string(currentTime->tm_year + 1900)) != std::string::npos);
    }

    SECTION("returns correct month") {
        REQUIRE(result.find(month) != std::string::npos);
    }

    SECTION("returns correct day") {
        REQUIRE(result.find(std::to_string(currentTime->tm_mday)) != std::string::npos);
    }

    SECTION("returns date as a string") {
        REQUIRE(typeid(result).name() == typeid(std::string).name());
    }

    SECTION("does not return undefined") {
        REQUIRE_FALSE(result.empty());
    }
}
