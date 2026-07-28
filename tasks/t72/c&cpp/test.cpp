TEST_CASE("BitSequenceEncoder behavior", "[bitsequenceencoder]") {
    BitSequenceEncoder encoder;

    SECTION("basic bits integer") {
        json data = {{"name", "Processor"}, {"bits", 255}};
        REQUIRE(encoder.encode(data) == R"({"bits":"11111111","name":"Processor"})");
    }

    SECTION("nested bits integers") {
        json data = {{"component", {{"name", "ALU"}, {"bits", 128}}}, {"bits", 1}};
        REQUIRE(encoder.encode(data) == R"({"bits":"00000001","component":{"bits":"10000000","name":"ALU"}})");
    }

    SECTION("non bits key is unchanged") {
        json data = {{"name", "Processor"}, {"value", 123}};
        REQUIRE(encoder.encode(data) == R"({"name":"Processor","value":123})");
    }

    SECTION("non integer bits value is unchanged") {
        json data = {{"name", "Unit"}, {"bits", "Already binary"}};
        REQUIRE(encoder.encode(data) == R"({"bits":"Already binary","name":"Unit"})");
    }

    SECTION("multiple nested bits values") {
        json data = {
            {"processor", {{"bits", 3}, {"type", "A"}}},
            {"memory", {{"bits", 255}, {"size", 16}}},
            {"ports", {{"count", 2}, {"bits", 128}}},
        };
        REQUIRE(encoder.encode(data) == R"({"memory":{"bits":"11111111","size":16},"ports":{"bits":"10000000","count":2},"processor":{"bits":"00000011","type":"A"}})");
    }
}
