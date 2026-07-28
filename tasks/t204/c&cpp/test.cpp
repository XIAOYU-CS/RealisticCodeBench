TEST_CASE("convert_arabic_numerals_to_english", "[conversion]") {
    SECTION("converts single Arabic numerals to English") {
        REQUIRE(convert_arabic_numerals_to_english("١") == "1");
        REQUIRE(convert_arabic_numerals_to_english("٥") == "5");
        REQUIRE(convert_arabic_numerals_to_english("٩") == "9");
    }

    SECTION("converts a string of Arabic numerals to English") {
        REQUIRE(convert_arabic_numerals_to_english("٠١٢٣٤٥٦٧٨٩") == "0123456789");
    }

    SECTION("handles strings with Arabic and English numerals mixed") {
        REQUIRE(convert_arabic_numerals_to_english("٠١23٤5") == "012345");
    }

    SECTION("leaves non-numeral characters unchanged") {
        REQUIRE(convert_arabic_numerals_to_english("Hello World!") == "Hello World!");
        REQUIRE(convert_arabic_numerals_to_english("2022-٢٠٢٣") == "2022-2023");
    }

    SECTION("works with full sentences that include Arabic numerals") {
        REQUIRE(convert_arabic_numerals_to_english("The year is ٢٠٢٤!") == "The year is 2024!");
    }

    SECTION("handles empty strings correctly") {
        REQUIRE(convert_arabic_numerals_to_english("") == "");
    }

    SECTION("processes Arabic numerals in a complex mixed context") {
        REQUIRE(convert_arabic_numerals_to_english("Price: ٥٠٠$ and Date: ٢٠٢٣-١٢-٠١") == "Price: 500$ and Date: 2023-12-01");
    }
}