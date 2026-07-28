TEST_CASE("extractCssFromStylesheet", "[extractCssFromStylesheet]") {
    SECTION("empty stylesheet returns empty string") {
        REQUIRE(extractCssFromStylesheet("") == "");
    }

    SECTION("non-css text returns empty string") {
        REQUIRE(extractCssFromStylesheet("not a stylesheet") == "");
    }

    SECTION("inline css returns normalized css text") {
        REQUIRE(extractCssFromStylesheet("div { font-size: 16px; }") == "div {font-size: 16px;}");
    }

    SECTION("multiple rules are concatenated") {
        REQUIRE(extractCssFromStylesheet("body { background-color: red; } p { color: blue; }") ==
                "body {background-color: red;}p {color: blue;}");
    }

    SECTION("empty declarations are ignored") {
        REQUIRE(extractCssFromStylesheet("a { ; color : green ; ; }") == "a {color: green;}");
    }
}
