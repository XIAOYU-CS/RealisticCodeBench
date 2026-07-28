TEST_CASE("remove_inner_asterisks") {
    SECTION("removes inner asterisk from one parenthesized span") {
        REQUIRE(remove_inner_asterisks("Hello (*wo*rld*)!") == "Hello (*world*)!");
    }

    SECTION("removes multiple inner asterisks") {
        REQUIRE(remove_inner_asterisks("(*he*l*lo*)") == "(*hello*)");
    }

    SECTION("leaves already clean span unchanged") {
        REQUIRE(remove_inner_asterisks("(*hello*)") == "(*hello*)");
    }

    SECTION("processes multiple matching spans") {
        REQUIRE(remove_inner_asterisks("(*a*b*) and (*c*d*)") == "(*ab*) and (*cd*)");
    }

    SECTION("leaves text without matching pattern unchanged") {
        REQUIRE(remove_inner_asterisks("This is a test without matching parentheses.") ==
                "This is a test without matching parentheses.");
    }

    SECTION("leaves unmatched opening pattern unchanged") {
        REQUIRE(remove_inner_asterisks("Before (*unclosed text") == "Before (*unclosed text");
    }
}
