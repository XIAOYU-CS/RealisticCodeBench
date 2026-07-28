TEST_CASE("sqlWhereToPrefix - Simple comparison", "[sqlWhereToPrefix]") {
    SECTION("Single comparison operation") {
        const std::string whereClause = "age > 20";
        const std::string expected = "> age 20";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}

TEST_CASE("sqlWhereToPrefix - AND logical operator", "[sqlWhereToPrefix]") {
    SECTION("AND operation with two conditions") {
        const std::string whereClause = "age > 20 AND name = 'Alice'";
        const std::string expected = "AND > age 20 = name 'Alice'";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}

TEST_CASE("sqlWhereToPrefix - OR logical operator", "[sqlWhereToPrefix]") {
    SECTION("OR operation with two conditions") {
        const std::string whereClause = "age < 18 OR age > 65";
        const std::string expected = "OR < age 18 > age 65";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}

TEST_CASE("sqlWhereToPrefix - NOT operator", "[sqlWhereToPrefix]") {
    SECTION("NOT unary operator") {
        const std::string whereClause = "NOT active = 1";
        const std::string expected = "= NOT active 1";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}

TEST_CASE("sqlWhereToPrefix - IS NULL operator", "[sqlWhereToPrefix]") {
    SECTION("IS NULL operation") {
        const std::string whereClause = "name IS NULL";
        const std::string expected = "IS name NULL";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}

TEST_CASE("sqlWhereToPrefix - Empty WHERE clause", "[sqlWhereToPrefix]") {
    SECTION("Empty input string") {
        const std::string whereClause = "";
        const std::string expected = "";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}

TEST_CASE("sqlWhereToPrefix - Additional test cases", "[sqlWhereToPrefix]") {
    SECTION("Complex expression with parentheses") {
        const std::string whereClause = "(age > 20 AND name = 'Alice') OR score < 100";
        const std::string expected = "OR AND > age 20 = name 'Alice' < score 100";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }

    SECTION("Multiple comparison operators") {
        const std::string whereClause = "price >= 50 AND price <= 100";
        const std::string expected = "AND >= price 50 <= price 100";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }

    SECTION("Whitespace handling") {
        const std::string whereClause = "  age   >   20  ";
        const std::string expected = "> age 20";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }

    SECTION("BETWEEN ternary operator") {
        const std::string whereClause = "score BETWEEN 80 AND 100";
        const std::string expected = "BETWEEN score 80 100";
        const std::string result = sqlWhereToPrefix(whereClause);
        REQUIRE(result == expected);
    }
}
