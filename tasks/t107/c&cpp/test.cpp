#include <any>
#include <string>

namespace {

template <typename T>
T any_value(const AttributeMap& values, const std::string& key) {
    return std::any_cast<T>(values.at(key));
}

struct Person {
    std::string name;
    int age;

    AttributeMap to_dict() const {
        return {{"name", name}, {"age", age}};
    }
};

struct Car {
    std::string make;
    std::string model;
    int year = 2020;

    AttributeMap to_dict() const {
        return {{"make", make}, {"model", model}, {"year", year}};
    }
};

struct EmptyClass {
    AttributeMap to_dict() const {
        return {};
    }
};

struct Student {
    static constexpr const char* school_name = "Example School";
    std::string name;
    std::string grade = "A";

    AttributeMap to_dict() const {
        return {{"name", name}, {"grade", grade}};
    }
};

}  // namespace

TEST_CASE("convert_class_instance_to_dict behavior") {
    SECTION("dataclass-like object") {
        AttributeMap result = convert_class_instance_to_dict(Person{"Alice", 30});

        REQUIRE(any_value<std::string>(result, "name") == "Alice");
        REQUIRE(any_value<int>(result, "age") == 30);
    }

    SECTION("regular class instance") {
        AttributeMap result = convert_class_instance_to_dict(Car{"Toyota", "Corolla"});

        REQUIRE(any_value<std::string>(result, "make") == "Toyota");
        REQUIRE(any_value<std::string>(result, "model") == "Corolla");
        REQUIRE(any_value<int>(result, "year") == 2020);
    }

    SECTION("empty class") {
        REQUIRE(convert_class_instance_to_dict(EmptyClass{}).empty());
    }

    SECTION("class variable is excluded") {
        AttributeMap result = convert_class_instance_to_dict(Student{"John"});

        REQUIRE(any_value<std::string>(result, "name") == "John");
        REQUIRE(any_value<std::string>(result, "grade") == "A");
        REQUIRE(result.count("school_name") == 0);
    }

    SECTION("invalid input without attributes") {
        REQUIRE(convert_class_instance_to_dict(AttributeMap{}).empty());
    }

    SECTION("input map is copied") {
        AttributeMap source = {{"name", std::string("Alice")}};
        AttributeMap result = convert_class_instance_to_dict(source);
        source["name"] = std::string("Bob");

        REQUIRE(any_value<std::string>(result, "name") == "Alice");
    }
}
