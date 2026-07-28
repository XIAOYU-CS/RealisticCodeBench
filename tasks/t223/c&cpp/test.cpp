TEST_CASE("convertUint8ArrayToBase64 encodes bytes", "[convertUint8ArrayToBase64]") {
    SECTION("empty array") {
        REQUIRE(convertUint8ArrayToBase64({}) == "");
    }

    SECTION("one byte adds two padding characters") {
        REQUIRE(convertUint8ArrayToBase64({255}) == "/w==");
    }

    SECTION("two bytes add one padding character") {
        REQUIRE(convertUint8ArrayToBase64({255, 255}) == "//8=");
    }

    SECTION("three bytes have no padding") {
        REQUIRE(convertUint8ArrayToBase64({255, 255, 255}) == "////");
    }

    SECTION("four bytes start a second padded block") {
        REQUIRE(convertUint8ArrayToBase64({72, 101, 108, 108}) == "SGVsbA==");
    }

    SECTION("text bytes encode normally") {
        REQUIRE(convertUint8ArrayToBase64({77, 97, 110}) == "TWFu");
    }
}
