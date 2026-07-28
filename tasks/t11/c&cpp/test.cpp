TEST_CASE("Extract domestic US phone number formats", "[phone_numbers]") {
    std::string text = "Call me at 555-123-4567 or (555) 987-6543. Also try 1234567890.";
    std::vector<std::string> expected = {"555-123-4567", "(555) 987-6543", "1234567890"};
    auto result = extract_phone_numbers(text, false, false);

    REQUIRE(result.size() == 3);

    for (const auto& num : expected) {
        REQUIRE(std::find(result.begin(), result.end(), num) != result.end());
    }
}

TEST_CASE("Extract international phone number formats", "[phone_numbers]") {
    std::string text = "International numbers: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678";
    std::vector<std::string> expected = {"+1-800-555-1234", "+44 20 7946 0853", "+86 138 1234 5678"};
    auto result = extract_phone_numbers(text);

    REQUIRE(result.size() == 3);

    for (const auto& num : expected) {
        REQUIRE(std::find(result.begin(), result.end(), num) != result.end());
    }
}

TEST_CASE("Extract both domestic and international numbers from mixed text", "[phone_numbers]") {
    std::string text = "Contact: +1-800-555-1234, local: (555) 123-4567, UK: +44 20 7946 0853";
    std::vector<std::string> expected = {"+1-800-555-1234", "(555) 123-4567", "+44 20 7946 0853"};
    auto result = extract_phone_numbers(text);

    REQUIRE(result.size() == 3);

    for (const auto& num : expected) {
        REQUIRE(std::find(result.begin(), result.end(), num) != result.end());
    }
}

TEST_CASE("Clean format option removes all separators", "[phone_numbers]") {
    std::string text = "Call +1-800-555-1234 or (555) 123-4567";
    std::vector<std::string> expected = {"18005551234", "5551234567"};
    auto result = extract_phone_numbers(text, true, true);

    REQUIRE(result.size() == 2);

    for (const auto& num : expected) {
        REQUIRE(std::find(result.begin(), result.end(), num) != result.end());
    }
}

TEST_CASE("Duplicate phone numbers are removed", "[phone_numbers]") {
    std::string text = "Same number: 555-123-4567, 555-123-4567, and +1-800-555-1234, +1-800-555-1234";
    auto result = extract_phone_numbers(text);

    REQUIRE(result.size() == 2);
    REQUIRE(std::find(result.begin(), result.end(), "555-123-4567") != result.end());
    REQUIRE(std::find(result.begin(), result.end(), "+1-800-555-1234") != result.end());
}