TEST_CASE("extract_dynamic_value_with_default_prefix_and_suffix") {
    auto result = parse_dynamic_id("{userId}_profile_page");
    std::map<std::string, std::optional<std::string>> expected = {{"custom_id", "profile_page"}, {"dynamic_value", "userId"}};
    REQUIRE(result == expected);
}

TEST_CASE("work_with_custom_prefix_and_suffix") {
    std::map<std::string, std::any> options = {{"prefix", std::string("[")}, {"suffix", std::string("]_")}};
    auto result = parse_dynamic_id("[productId]_details_view", false, options);
    std::map<std::string, std::optional<std::string>> expected = {{"custom_id", "details_view"}, {"dynamic_value", "productId"}};
    REQUIRE(result == expected);
}

TEST_CASE("return_full_value_when_no_dynamic_value_found") {
    auto result = parse_dynamic_id("static_page_name");
    std::map<std::string, std::optional<std::string>> expected = {{"custom_id", "static_page_name"}};
    REQUIRE(result == expected);
}

TEST_CASE("work_with_custom_regex") {
    std::regex custom_regex("#(.+?)#");
    std::map<std::string, std::any> options = {{"regex", custom_regex}};
    auto result = parse_dynamic_id("#sessionId#dashboard", false, options);
    std::map<std::string, std::optional<std::string>> expected = {{"custom_id", "dashboard"}, {"dynamic_value", "sessionId"}};
    REQUIRE(result == expected);
}

TEST_CASE("include_dynamic_value_when_required_even_if_not_found") {
    auto result = parse_dynamic_id("static_content", true);
    std::map<std::string, std::optional<std::string>> expected = {{"custom_id", "static_content"}, {"dynamic_value", std::nullopt}};
    REQUIRE(result == expected);
}
