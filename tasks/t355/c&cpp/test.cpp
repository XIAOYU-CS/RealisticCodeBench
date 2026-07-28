TEST_CASE("arraybuffer_to_base64 behavior", "[arraybuffer_to_base64]") {
SECTION("basic conversion") {
    std::vector<uint8_t> test_data = {'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'};
    std::string expected = "SGVsbG8gV29ybGQ=";
    std::string result = arraybuffer_to_base64(test_data);
    REQUIRE(result == expected);

    std::vector<uint8_t> test_bytearray = {'H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'};
    std::string result_bytearray = arraybuffer_to_base64(test_bytearray);
    REQUIRE(result_bytearray == expected);
}

SECTION("URL safe conversion") {
    std::vector<uint8_t> test_data = {255, 254, 253};
    
    std::string standard_result = arraybuffer_to_base64(test_data, false);
    std::string expected_standard = "//79";
    REQUIRE(standard_result == expected_standard);

    std::string url_safe_result = arraybuffer_to_base64(test_data, true);
    std::string expected_url_safe = "__79";
    REQUIRE(url_safe_result == expected_url_safe);

    REQUIRE(url_safe_result.find('+') == std::string::npos);
    REQUIRE(url_safe_result.find('/') == std::string::npos);
}

SECTION("padding control") {
    std::vector<uint8_t> test_data = {'H', 'e', 'l', 'l', 'o'};
    std::string result_with_padding = arraybuffer_to_base64(test_data, false, true);
    REQUIRE(result_with_padding.back() == '=');
    std::string result_without_padding = arraybuffer_to_base64(test_data, false, false);
    REQUIRE(result_without_padding.back() != '=');
    std::string core_with_padding = result_with_padding.substr(0, result_with_padding.find('='));
    REQUIRE(core_with_padding == result_without_padding);
}

SECTION("empty input") {
    std::vector<uint8_t> empty_data;
    std::string result = arraybuffer_to_base64(empty_data);
    REQUIRE(result.empty());
    
    std::vector<uint8_t> empty_bytearray;
    std::string result_bytearray = arraybuffer_to_base64(empty_bytearray);
    REQUIRE(result_bytearray.empty());
    
    std::string result_url_safe = arraybuffer_to_base64(empty_data, true);
    REQUIRE(result_url_safe.empty());
}

SECTION("binary data and vector input") {
    std::vector<uint8_t> binary_data(256);
    for (int i = 0; i < 256; ++i) {
        binary_data[i] = static_cast<uint8_t>(i);
    }
    std::string result = arraybuffer_to_base64(binary_data);
    REQUIRE_FALSE(result.empty());
    REQUIRE(result.substr(0, 12) == "AAECAwQFBgcI");
    
    std::vector<uint8_t> list_data = {72, 101, 108, 108, 111};
    std::string result_list = arraybuffer_to_base64(list_data);
    std::string expected_list = "SGVsbG8=";
    REQUIRE(result_list == expected_list);
}
}
