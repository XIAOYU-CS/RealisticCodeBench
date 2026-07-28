#include <cmath>
#include <map>
#include <stdexcept>
#include <string>
#include <vector>

class TestObj {
public:
    std::string name;
    std::map<std::string, int> attrs;

    TestObj(const std::string& name) : name(name) {}

    void setAttr(const std::string& key, int value) {
        attrs[key] = value;
    }

    int getAttr(const std::string& key) const {
        auto it = attrs.find(key);
        if (it != attrs.end()) {
            return it->second;
        }
        throw std::runtime_error("Attribute not found");
    }

    bool hasAttr(const std::string& key) const {
        return attrs.find(key) != attrs.end();
    }
};

TEST_CASE("Test empty list") {
    std::vector<TestObj> objects;
    REQUIRE(check_all_same_attribute(objects, "value"));
}

TEST_CASE("Test all same values") {
    TestObj obj1("obj1");
    obj1.setAttr("value", 10);
    TestObj obj2("obj2");
    obj2.setAttr("value", 10);
    TestObj obj3("obj3");
    obj3.setAttr("value", 10);

    std::vector<TestObj> objects = {obj1, obj2, obj3};
    REQUIRE(check_all_same_attribute(objects, "value"));
}

TEST_CASE("Test different values") {
    TestObj obj1("obj1");
    obj1.setAttr("value", 10);
    TestObj obj2("obj2");
    obj2.setAttr("value", 20);
    TestObj obj3("obj3");
    obj3.setAttr("value", 10);

    std::vector<TestObj> objects = {obj1, obj2, obj3};
    REQUIRE_FALSE(check_all_same_attribute(objects, "value"));
}

TEST_CASE("Test missing attribute with default") {
    TestObj obj1("obj1");
    obj1.setAttr("value", 5);
    TestObj obj2("obj2");
    TestObj obj3("obj3");
    obj3.setAttr("value", 5);

    std::vector<TestObj> objects = {obj1, obj2, obj3};
    REQUIRE(check_all_same_attribute(objects, "value", nullptr, 5));
}

TEST_CASE("Test custom comparator") {
    TestObj obj1("obj1");
    obj1.setAttr("value", 10);
    TestObj obj2("obj2");
    obj2.setAttr("value", 12);
    TestObj obj3("obj3");
    obj3.setAttr("value", 8);

    auto within_range = [](int a, int b) {
        return std::abs(a - b) <= 5;
    };

    std::vector<TestObj> objects = {obj1, obj2, obj3};
    REQUIRE(check_all_same_attribute(objects, "value", within_range));
}
