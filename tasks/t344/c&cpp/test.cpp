TEST_CASE("Test basic HTML splitting") {
    std::string html = "<p>Hello</p>World<ul><li>Item1</li></ul>";
    auto result = splitHtmlContent(html);
    std::vector<std::string> expected = {"<p>Hello</p>", "World", "<ul><li>Item1</li></ul>"};
    REQUIRE(result == expected);
}

TEST_CASE("Test custom target tags") {
    std::string html = "<div>Content</div><span>Text</span>End";
    auto result = splitHtmlContent(html, {"div", "span"});
    std::vector<std::string> expected = {"<div>Content</div>", "<span>Text</span>", "End"};
    REQUIRE(result == expected);
}

TEST_CASE("Test preserve whitespace mode") {
    std::string html = "  Start  <p>  Content  </p>  End  ";
    auto result = splitHtmlContent(html, {}, true);
    std::vector<std::string> expected = {"  Start  ", "<p>  Content  </p>", "  End  "};
    REQUIRE(result == expected);
}

TEST_CASE("Test strip whitespace mode") {
    std::string html = "  Start  <p>  Content  </p>  End  ";
    auto result = splitHtmlContent(html, {}, false);
    std::vector<std::string> expected = {"Start", "<p>  Content  </p>", "End"};
    REQUIRE(result == expected);
}

TEST_CASE("Test tags with attributes") {
    std::string html = "Text<div class=\"container\" id=\"main\">Content</div>End";
    auto result = splitHtmlContent(html, {"div"});
    std::vector<std::string> expected = {"Text", "<div class=\"container\" id=\"main\">Content</div>", "End"};
    REQUIRE(result == expected);
}

TEST_CASE("Test error handling") {
    REQUIRE_THROWS_AS(splitHtmlContent("<p>test</p>", {"", "   "}), std::invalid_argument);
    REQUIRE_THROWS_WITH(splitHtmlContent("<p>test</p>", {"", "   "}), "At least one valid tag must be specified");
}

TEST_CASE("Test no matching tags") {
    std::string html = "Just plain text without any target tags";
    auto result = splitHtmlContent(html, {"div", "span"});
    std::vector<std::string> expected = {"Just plain text without any target tags"};
    REQUIRE(result == expected);
}
