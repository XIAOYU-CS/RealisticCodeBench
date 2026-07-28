TEST_CASE("TestGetColumnDetails") {
    SECTION("should_parse_basic_csv_with_no_quotes") {
        string csv = "Name,Age,City\nAlice,25,New York\nBob,30,Los Angeles";
        auto result = get_column_details(csv);

        REQUIRE(result.size() == 3);
        
        map<string, variant<string, vector<string>, int>> expected0 = {
            {"columnName", "Name"},
            {"dataType", "string"},
            {"sampleValues", vector<string>{"Alice", "Bob"}},
            {"totalCount", 2},
            {"emptyCount", 0},
            {"nonEmptyCount", 2}
        };
        for (const auto& [key, val] : expected0) {
            REQUIRE(result[0][key] == val);
        }

        map<string, variant<string, vector<string>, int>> expected1 = {
            {"columnName", "Age"},
            {"dataType", "number"},
            {"sampleValues", vector<string>{"25", "30"}},
            {"totalCount", 2},
            {"emptyCount", 0},
            {"nonEmptyCount", 2}
        };
        for (const auto& [key, val] : expected1) {
            REQUIRE(result[1][key] == val);
        }

        REQUIRE(result[2]["columnName"] == ColumnValue(string("City")));
        REQUIRE(result[2]["dataType"] == ColumnValue(string("string")));
    }

    SECTION("should_handle_quoted_fields_containing_commas") {
        string csv = "Name,Title\n\"Alice, Jr.\",Engineer\nBob,\"Senior, Manager\"";
        auto result = get_column_details(csv);

        REQUIRE(result[0]["sampleValues"] == ColumnValue(vector<string>{"Alice, Jr.", "Bob"}));
        REQUIRE(result[1]["sampleValues"] == ColumnValue(vector<string>{"Engineer", "Senior, Manager"}));
    }

    SECTION("should_infer_number_type_for_numeric_columns") {
        string csv = "Id,Score\n1,95.5\n2,87\n3,100";
        auto result = get_column_details(csv);

        REQUIRE(result[0]["dataType"] == ColumnValue(string("number")));
        REQUIRE(result[1]["dataType"] == ColumnValue(string("number")));
    }

    SECTION("should_infer_boolean_type_for_true_false_columns") {
        string csv = "Name,Active,Verified\nAlice,true,TRUE\nBob,false,FALSE";
        auto result = get_column_details(csv);

        REQUIRE(result[1]["dataType"] == ColumnValue(string("boolean")));
        REQUIRE(result[2]["dataType"] == ColumnValue(string("boolean")));
    }

    SECTION("should_mark_column_as_mixed_if_contains_both_numbers_and_strings") {
        string csv = "Value\n123\nabc\n456";
        auto result = get_column_details(csv);

        REQUIRE(result[0]["dataType"] == ColumnValue(string("mixed")));
    }

    SECTION("should_handle_empty_cells_and_count_them") {
        string csv = "Name,Age\nAlice,\n,30\nBob,25";
        auto result = get_column_details(csv);

        REQUIRE(result[0]["columnName"] == ColumnValue(string("Name")));
        REQUIRE(result[0]["emptyCount"] == ColumnValue(1));
        REQUIRE(result[0]["nonEmptyCount"] == ColumnValue(2));

        REQUIRE(result[1]["columnName"] == ColumnValue(string("Age")));
        REQUIRE(result[1]["emptyCount"] == ColumnValue(1));
        REQUIRE(result[1]["nonEmptyCount"] == ColumnValue(2));
    }

    SECTION("should_handle_rows_with_fewer_columns") {
        string csv = "A,B,C\n1,2,3\n4,5\n6,7,8";
        auto result = get_column_details(csv);

        REQUIRE(result.size() == 3);

        REQUIRE(result[0]["sampleValues"] == ColumnValue(vector<string>{"1", "4", "6"}));
        REQUIRE(result[1]["sampleValues"] == ColumnValue(vector<string>{"2", "5", "7"}));
        REQUIRE(result[2]["sampleValues"] == ColumnValue(vector<string>{"3", "8"}));

        REQUIRE(result[2]["emptyCount"] == ColumnValue(1));
    }

    SECTION("should_return_empty_array_for_empty_input") {
        REQUIRE(get_column_details("").empty());
        REQUIRE(get_column_details("\n\n").empty());
    }

    SECTION("should_handle_csv_with_only_header") {
        string csv = "Name,Age";
        auto result = get_column_details(csv);

        REQUIRE(result.size() == 2);
        map<string, variant<string, vector<string>, int>> expected = {
            {"columnName", "Name"},
            {"dataType", "empty"},
            {"totalCount", 0},
            {"emptyCount", 0},
            {"nonEmptyCount", 0},
            {"sampleValues", vector<string>{}}
        };
        for (const auto& [key, val] : expected) {
            REQUIRE(result[0][key] == val);
        }
    }

    SECTION("should_trim_whitespace_from_fields") {
        string csv = " Name , \" Age \" \n  Alice  , \"  25  \" ";
        auto result = get_column_details(csv);

        REQUIRE(result[0]["columnName"] == ColumnValue(string("Name")));
        REQUIRE(result[1]["columnName"] == ColumnValue(string("Age")));
        REQUIRE(result[0]["sampleValues"] == ColumnValue(vector<string>{"Alice"}));
        REQUIRE(result[1]["sampleValues"] == ColumnValue(vector<string>{"25"}));
    }
}
