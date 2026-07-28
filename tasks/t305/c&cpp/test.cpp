TEST_CASE("Test detection of global phone number formats", "[phone]") {
    std::string text = "Call me at +1-555-123-4567 or 555 123 4567";
    auto result = detect_phone_numbers(text, "global");

    REQUIRE(result.size() == 2);
    REQUIRE(std::find(result.begin(), result.end(), std::map<std::string, std::string>{{"number", "+1-555-123-4567"}, {"type", "international"}}) != result.end());
    REQUIRE(std::find(result.begin(), result.end(), std::map<std::string, std::string>{{"number", "555 123 4567"}, {"type", "local"}}) != result.end());
}

TEST_CASE("Test detection of Chinese mobile phone numbers", "[phone]") {
    std::string text = "我的手机号是13812345678，办公室电话是+8613987654321";
    auto result = detect_phone_numbers(text, "cn");

    REQUIRE(result.size() == 2);
    int cn_mobile_count = 0;
    for (const auto& item : result) {
        if (item.at("type") == "cn_mobile") {
            cn_mobile_count++;
        }
    }
    REQUIRE(cn_mobile_count == 2);
}

TEST_CASE("Test detection of US phone number formats", "[phone]") {
    std::string text = "Contact us at +1 (555) 123-4567 or +1-555-123-4568";
    auto result = detect_phone_numbers(text, "us");

    REQUIRE(result.size() == 2);
    for (const auto& item : result) {
        REQUIRE(item.at("type") == "international");
        REQUIRE(item.at("number").rfind("+1", 0) == 0);
    }
}

TEST_CASE("Test detection with custom regex pattern", "[phone]") {
    std::string text = "Emergency: 911, Info: 411, Service: 311";
    std::string custom_pattern = "\\b(911|411|311)\\b";
    auto result = detect_phone_numbers(text, "", custom_pattern);

    REQUIRE(result.size() == 3);
    std::vector<std::string> numbers;
    for (const auto& item : result) {
        numbers.push_back(item.at("number"));
    }
    REQUIRE(std::find(numbers.begin(), numbers.end(), "911") != numbers.end());
    REQUIRE(std::find(numbers.begin(), numbers.end(), "411") != numbers.end());
    REQUIRE(std::find(numbers.begin(), numbers.end(), "311") != numbers.end());
}

TEST_CASE("Test behavior when no phone numbers are found", "[phone]") {
    std::string text = "This text contains no phone numbers at all.";
    auto result = detect_phone_numbers(text, "global");

    REQUIRE(result.size() == 0);
    REQUIRE(result.empty());
}
