TEST_CASE("Test valid hex color inputs", "[hex_to_ansi]") {
    SECTION("Valid colors") {
        CHECK(hex_to_ansi("#FF5733") == "\x1b[38;2;255;87;51m");
        CHECK(hex_to_ansi("#00FF00") == "\x1b[38;2;0;255;0m");
        CHECK(hex_to_ansi("#0000FF") == "\x1b[38;2;0;0;255m");
    }
}

TEST_CASE("Test edge cases with black and white colors", "[hex_to_ansi]") {
    SECTION("Black and white colors") {
        CHECK(hex_to_ansi("#000000") == "\x1b[38;2;0;0;0m");
        CHECK(hex_to_ansi("#FFFFFF") == "\x1b[38;2;255;255;255m");
    }
}

TEST_CASE("Test lowercase hex digits", "[hex_to_ansi]") {
    SECTION("Lowercase hex digits") {
        CHECK(hex_to_ansi("#abcdef") == "\x1b[38;2;171;205;239m");
    }
}

TEST_CASE("Test leading zero components", "[hex_to_ansi]") {
    SECTION("Leading zero components") {
        CHECK(hex_to_ansi("#0A0B0C") == "\x1b[38;2;10;11;12m");
    }
}

TEST_CASE("Test invalid format", "[hex_to_ansi]") {
    SECTION("Missing hash and shorthand values") {
        CHECK_THROWS(hex_to_ansi("FF5733"));
        CHECK_THROWS(hex_to_ansi("#FFF"));
    }
}

TEST_CASE("Test invalid hex digits", "[hex_to_ansi]") {
    SECTION("Non-hex digits") {
        CHECK_THROWS(hex_to_ansi("#GG0000"));
    }
}
