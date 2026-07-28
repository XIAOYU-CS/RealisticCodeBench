TEST_CASE("TestContainsEmail", "[email]") {
    SECTION("test_contains_valid_email") {
        std::string test_string = "You can reach me at example@example.com for more info.";
        REQUIRE(containsEmailAddress(test_string));
    }

    SECTION("test_contains_email_with_special_characters") {
        std::string test_string = "My email address is john.doe123+test@gmail.com!";
        REQUIRE(containsEmailAddress(test_string));
    }

    SECTION("test_does_not_contain_email") {
        std::string test_string = "This string does not have an email.";
        REQUIRE_FALSE(containsEmailAddress(test_string));
    }

    SECTION("test_contains_multiple_emails") {
        std::string test_string = "You can contact me at example1@example.com or example2@example.com.";
        REQUIRE(containsEmailAddress(test_string));
    }

    SECTION("test_contains_invalid_email_format") {
        std::string test_string = "Please contact me at example@.com or test@domain.";
        REQUIRE_FALSE(containsEmailAddress(test_string));
    }
}
