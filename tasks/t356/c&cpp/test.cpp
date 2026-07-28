TEST_CASE("should detect continuous bullish trend") {
    std::vector<std::map<std::string, double>> candles = {
        {{"open", 100}, {"close", 105}},
        {{"open", 105}, {"close", 110}},
        {{"open", 110}, {"close", 115}}
    };
    auto result = consecutive_candles_indicator(candles, 3);
    REQUIRE(result["bullish"] == true);
    REQUIRE(result["bearish"] == false);
}

TEST_CASE("should detect continuous bearish trend") {
    std::vector<std::map<std::string, double>> candles = {
        {{"open", 115}, {"close", 110}},
        {{"open", 110}, {"close", 105}},
        {{"open", 105}, {"close", 100}}
    };
    auto result = consecutive_candles_indicator(candles, 3);
    REQUIRE(result["bullish"] == false);
    REQUIRE(result["bearish"] == true);
}

TEST_CASE("should return false when insufficient data") {
    std::vector<std::map<std::string, double>> candles = {
        {{"open", 100}, {"close", 105}}
    };
    auto result = consecutive_candles_indicator(candles, 3);
    REQUIRE(result["bullish"] == false);
    REQUIRE(result["bearish"] == false);
}

TEST_CASE("should handle tolerance with minor violations in bullish trend") {
    std::vector<std::map<std::string, double>> candles = {
        {{"open", 100}, {"close", 105}},
        {{"open", 105}, {"close", 103}},
        {{"open", 103}, {"close", 108}}
    };
    auto result = consecutive_candles_indicator(candles, 3, 0.3);
    REQUIRE(result["bullish"] == true);
    REQUIRE(result["bearish"] == false);
}

TEST_CASE("should detect violations without tolerance") {
    std::vector<std::map<std::string, double>> candles = {
        {{"open", 100}, {"close", 105}},
        {{"open", 105}, {"close", 103}},
        {{"open", 103}, {"close", 108}}
    };
    auto result = consecutive_candles_indicator(candles, 3, 0);
    REQUIRE(result["bullish"] == false);
    REQUIRE(result["bearish"] == false);
}
