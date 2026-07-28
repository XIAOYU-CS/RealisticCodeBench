#include <string>
#include <vector>

TEST_CASE("extract_html_waffle_table_to_csv_data") {
    SECTION("table with multiple rows and columns") {
        std::string html =
            "<table class=\"waffle\"><tbody>"
            "<tr><td>Cell 1</td><td>Cell 2</td></tr>"
            "<tr><td>Cell 3</td><td>Cell 4</td></tr>"
            "</tbody></table>";
        REQUIRE(extract_html_waffle_table_to_csv_data(html) == std::vector<std::vector<std::string>>{
            {"Cell 1", "Cell 2"},
            {"Cell 3", "Cell 4"},
        });
    }

    SECTION("table with empty cells") {
        std::string html =
            "<table class=\"waffle\"><tbody>"
            "<tr><td>Cell 1</td><td></td></tr>"
            "<tr><td></td><td>Cell 4</td></tr>"
            "</tbody></table>";
        REQUIRE(extract_html_waffle_table_to_csv_data(html) == std::vector<std::vector<std::string>>{
            {"Cell 1", ""},
            {"", "Cell 4"},
        });
    }

    SECTION("table with only one row") {
        std::string html =
            "<table class=\"waffle\"><tbody>"
            "<tr><td>Single Cell 1</td><td>Single Cell 2</td></tr>"
            "</tbody></table>";
        REQUIRE(extract_html_waffle_table_to_csv_data(html) == std::vector<std::vector<std::string>>{
            {"Single Cell 1", "Single Cell 2"},
        });
    }

    SECTION("table with only one column") {
        std::string html =
            "<table class=\"waffle\"><tbody>"
            "<tr><td>Column Cell 1</td></tr>"
            "<tr><td>Column Cell 2</td></tr>"
            "</tbody></table>";
        REQUIRE(extract_html_waffle_table_to_csv_data(html) == std::vector<std::vector<std::string>>{
            {"Column Cell 1"},
            {"Column Cell 2"},
        });
    }

    SECTION("no table with waffle class") {
        std::string html = "<div><p>No table here!</p></div>";
        REQUIRE(extract_html_waffle_table_to_csv_data(html).empty());
    }
}
