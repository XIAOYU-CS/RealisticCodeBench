#include <stdexcept>
#include <string>
#include <vector>

static std::vector<std::string> ids(const std::vector<LeveledCourse>& courses) {
    std::vector<std::string> result;
    for (const auto& course : courses) {
        result.push_back(course.course.id);
    }
    return result;
}

TEST_CASE("topological_sort assigns levels and validates prerequisites") {
    SECTION("empty course list") {
        REQUIRE(topological_sort({}).empty());
    }

    SECTION("single course starts at level zero") {
        auto result = topological_sort({Course("101")});

        REQUIRE(result.size() == 1);
        REQUIRE(result[0].course.id == "101");
        REQUIRE(result[0].level == 0);
    }

    SECTION("direct dependency increases level") {
        auto result = topological_sort({Course("101"), Course("102", {"101"})});

        REQUIRE(ids(result) == std::vector<std::string>{"101", "102"});
        REQUIRE(result[0].level == 0);
        REQUIRE(result[1].level == 1);
    }

    SECTION("recommended courses also count as prerequisites") {
        auto result = topological_sort({Course("base"), Course("elective", {}, {"base"})});

        REQUIRE(ids(result) == std::vector<std::string>{"base", "elective"});
        REQUIRE(result[1].level == 1);
    }

    SECTION("multiple dependency chain assigns deeper levels") {
        auto result = topological_sort({
            Course("Math"),
            Course("Advanced Math", {"Math"}),
            Course("Physics", {"Math"}, {"Advanced Math"}),
            Course("Chemistry")
        });

        REQUIRE(result[0].level == 0);
        REQUIRE(result[1].level == 1);
        REQUIRE(result[2].level == 2);
        REQUIRE(result[3].level == 0);
    }

    SECTION("cycle raises invalid argument") {
        REQUIRE_THROWS_AS(topological_sort({
            Course("101", {"102"}),
            Course("102", {"101"})
        }), std::invalid_argument);
    }

    SECTION("unknown prerequisite raises invalid argument") {
        REQUIRE_THROWS_AS(topological_sort({Course("101", {"missing"})}), std::invalid_argument);
    }
}
