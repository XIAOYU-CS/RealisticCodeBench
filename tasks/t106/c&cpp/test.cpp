#include <string>
#include <vector>

namespace {
struct Person {
    std::string name;
    int age;
};

class Car {
public:
    Car(std::string make, std::string model) : make_(make), model_(model) {}

private:
    std::string make_;
    std::string model_;
};

class Dog {
public:
    Dog(std::string name, std::string breed) : name_(name), breed_(breed), age_(5) {}

private:
    std::string name_;
    std::string breed_;
    int age_;
};

class EmptyClass {};

class Student {
public:
    static constexpr const char* schoolName = "Example School";

    explicit Student(std::string name) : name_(name), grade_("A") {}

private:
    std::string name_;
    std::string grade_;
};
}

TEST_CASE("canClassToDict behavior", "[canClassToDict]") {
    SECTION("plain struct can be treated as a dictionary") {
        REQUIRE(canClassToDict(Person{"Alice", 30}));
    }

    SECTION("regular class instance can be treated as a dictionary") {
        REQUIRE(canClassToDict(Car{"Toyota", "Corolla"}));
    }

    SECTION("class with private attributes can be treated as a dictionary") {
        REQUIRE(canClassToDict(Dog{"Buddy", "Golden Retriever"}));
    }

    SECTION("empty class can be treated as a dictionary") {
        REQUIRE(canClassToDict(EmptyClass{}));
    }

    SECTION("class with static member can be treated as a dictionary") {
        REQUIRE(canClassToDict(Student{"John"}));
    }

    SECTION("primitive and primitive-like values cannot be treated as dictionaries") {
        REQUIRE_FALSE(canClassToDict(42));
        REQUIRE_FALSE(canClassToDict(3.14));
        REQUIRE_FALSE(canClassToDict(true));
        REQUIRE_FALSE(canClassToDict("name"));
        REQUIRE_FALSE(canClassToDict(std::string{"name"}));
        REQUIRE_FALSE(canClassToDict(std::vector<int>{1, 2, 3}));
    }
}
