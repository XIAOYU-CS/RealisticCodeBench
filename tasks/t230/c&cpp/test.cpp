static std::string formatDate(const std::tm& date) {
    char buffer[32];
    std::strftime(buffer, sizeof(buffer), "%a %b %d %Y", &date);
    return buffer;
}

TEST_CASE("calculate_good_friday_date", "[GoodFriday]") {
    SECTION("should correctly calculate Good Friday for 2024") {
        std::tm result = calculate_good_friday_date(2024);
        REQUIRE(formatDate(result) == "Fri Mar 29 2024");
    }

    SECTION("should correctly calculate Good Friday for 2021") {
        std::tm result = calculate_good_friday_date(2021);
        REQUIRE(formatDate(result) == "Fri Apr 02 2021");
    }

    SECTION("should correctly calculate Good Friday for 2000") {
        std::tm result = calculate_good_friday_date(2000);
        REQUIRE(formatDate(result) == "Fri Apr 21 2000");
    }

    SECTION("should correctly calculate Good Friday for 2019") {
        std::tm result = calculate_good_friday_date(2019);
        REQUIRE(formatDate(result) == "Fri Apr 19 2019");
    }

    SECTION("should correctly calculate Good Friday for 1999") {
        std::tm result = calculate_good_friday_date(1999);
        REQUIRE(formatDate(result) == "Fri Apr 02 1999");
    }

    SECTION("should correctly calculate Good Friday for 1981") {
        std::tm result = calculate_good_friday_date(1981);
        REQUIRE(formatDate(result) == "Fri Apr 17 1981");
    }

    SECTION("should correctly calculate Good Friday for 1954") {
        std::tm result = calculate_good_friday_date(1954);
        REQUIRE(formatDate(result) == "Fri Apr 16 1954");
    }
}
