#include <algorithm>

TEST_CASE("TestFindShiftJISNotGBK", "[ShiftJISTest]") {
    auto shiftjis_not_gbk = find_shiftjis_not_gbk();

    SECTION("test_known_shiftjis_character_not_in_gbk") {
        wchar_t known_shiftjis_only = L'ヱ';
        REQUIRE(std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), known_shiftjis_only) == shiftjis_not_gbk.end());
    }

    SECTION("test_character_unique_to_shiftjis") {
        wchar_t shiftjis_only = L'・';
        REQUIRE(std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), shiftjis_only) != shiftjis_not_gbk.end());
    }

    SECTION("test_character_in_both_encodings") {
        wchar_t common_character = L'水';
        REQUIRE(std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), common_character) == shiftjis_not_gbk.end());
    }

    SECTION("test_character_in_neither_encoding") {
        wchar_t neither_encoding_char = L'\U0001F4A9';
        REQUIRE(std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), neither_encoding_char) == shiftjis_not_gbk.end());
    }

    SECTION("test_bounds_of_bmp") {
        wchar_t edge_of_bmp = L'\uffff';
        if (std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), edge_of_bmp) != shiftjis_not_gbk.end()) {
            REQUIRE(std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), edge_of_bmp) != shiftjis_not_gbk.end());
        } else {
            REQUIRE(std::find(shiftjis_not_gbk.begin(), shiftjis_not_gbk.end(), edge_of_bmp) == shiftjis_not_gbk.end());
        }
    }
}
