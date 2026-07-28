TEST_CASE("convert_base64_to_array_buffer function", "[base64]") {
    // Test Case 1
    SECTION("should decode 'SGVsbG8sIFdvcmxkIQ==' to 'Hello, World!'") {
        std::string base64 = "SGVsbG8sIFdvcmxkIQ==";
        std::string expected = "Hello, World!";
        auto arrayBuffer = convert_base64_to_array_buffer(base64);
        std::string result(arrayBuffer.begin(), arrayBuffer.end());
        REQUIRE(result == expected);
    }

    // Test Case 2
    SECTION("should decode 'U29tZSB0ZXh0IHdpdGggc3BhcmluZyBhbmQgd29ya2luZyE=' to 'Some text with sparing and working!'") {
        std::string base64 = "U29tZSB0ZXh0IHdpdGggc3BhcmluZyBhbmQgd29ya2luZyE=";
        std::string expected = "Some text with sparing and working!";
        auto arrayBuffer = convert_base64_to_array_buffer(base64);
        std::string result(arrayBuffer.begin(), arrayBuffer.end());
        REQUIRE(result == expected);
    }

    SECTION("should decode a longer string") {
        std::string base64 = "QmFzZTY0IGVuY29kaW5nIGlzIGEgY29tbW9ubG9nIEZvciBiaW5hcnkgZGF0YQ==";
        std::string expected = "Base64 encoding is a commonlog For binary data";
        auto arrayBuffer = convert_base64_to_array_buffer(base64);
        std::string result(arrayBuffer.begin(), arrayBuffer.end());
        REQUIRE(result == expected);
    }

    // Test Case 4
    SECTION("should decode 'R2l2ZSBtZSBhbG9uZyBhIHBhdGggdG8gY29tcGxldGUgc3RhcnQgcGFnZS4=' to 'Give me along a path to complete start page.'") {
        std::string base64 = "R2l2ZSBtZSBhbG9uZyBhIHBhdGggdG8gY29tcGxldGUgc3RhcnQgcGFnZS4=";
        std::string expected = "Give me along a path to complete start page.";
        auto arrayBuffer = convert_base64_to_array_buffer(base64);
        std::string result(arrayBuffer.begin(), arrayBuffer.end());
        REQUIRE(result == expected);
    }

    SECTION("should decode an empty string") {
        auto arrayBuffer = convert_base64_to_array_buffer("");
        REQUIRE(arrayBuffer.empty());
    }

    SECTION("should preserve binary bytes") {
        auto arrayBuffer = convert_base64_to_array_buffer("AAECAwQF");
        REQUIRE(arrayBuffer == std::vector<uint8_t>{0, 1, 2, 3, 4, 5});
    }

    SECTION("should throw for malformed input") {
        REQUIRE_THROWS_AS(convert_base64_to_array_buffer("%%%"), std::invalid_argument);
    }
}
