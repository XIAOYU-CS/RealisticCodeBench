static int id_of(const Page& page) {
    return std::get<int>(page.at("id"));
}

static std::string name_of(const Page& page) {
    return std::get<std::string>(page.at("name"));
}

static const PageItems& items_of(const Page& page) {
    return std::get<PageItems>(page.at("items"));
}

TEST_CASE("basic tree structure building", "[build_tree_with_sort]") {
    std::vector<Page> pages = {
        {{"id", 1}, {"parentFolder", nullptr}, {"name", std::string("Root")}},
        {{"id", 2}, {"parentFolder", 1}, {"name", std::string("Child 1")}},
        {{"id", 3}, {"parentFolder", 1}, {"name", std::string("Child 2")}},
        {{"id", 4}, {"parentFolder", 2}, {"name", std::string("Grandchild 1")}}
    };

    auto result = build_tree_with_sort(pages);

    REQUIRE(result.size() == 1);
    REQUIRE(id_of(result[0]) == 1);
    REQUIRE(name_of(result[0]) == "Root");
    REQUIRE(items_of(result[0]).size() == 2);
    REQUIRE(id_of(items_of(result[0])[0]) == 2);
    REQUIRE(name_of(items_of(result[0])[0]) == "Child 1");
    REQUIRE(items_of(items_of(result[0])[0]).size() == 1);
    REQUIRE(id_of(items_of(items_of(result[0])[0])[0]) == 4);
    REQUIRE(id_of(items_of(result[0])[1]) == 3);
    REQUIRE(name_of(items_of(result[0])[1]) == "Child 2");
    REQUIRE(items_of(items_of(result[0])[1]).empty());
}

TEST_CASE("multiple root nodes", "[build_tree_with_sort]") {
    std::vector<Page> pages = {
        {{"id", 1}, {"parentFolder", nullptr}, {"name", std::string("Root 1")}},
        {{"id", 2}, {"parentFolder", nullptr}, {"name", std::string("Root 2")}},
        {{"id", 3}, {"parentFolder", 1}, {"name", std::string("Child of Root 1")}},
        {{"id", 4}, {"parentFolder", 2}, {"name", std::string("Child of Root 2")}}
    };

    auto result = build_tree_with_sort(pages);

    REQUIRE(result.size() == 2);
    REQUIRE(id_of(result[0]) == 1);
    REQUIRE(name_of(result[0]) == "Root 1");
    REQUIRE(id_of(result[1]) == 2);
    REQUIRE(name_of(result[1]) == "Root 2");
    REQUIRE(items_of(result[0]).size() == 1);
    REQUIRE(items_of(result[1]).size() == 1);
    REQUIRE(id_of(items_of(result[0])[0]) == 3);
    REQUIRE(id_of(items_of(result[1])[0]) == 4);
}

TEST_CASE("sorting functionality", "[build_tree_with_sort]") {
    std::vector<Page> pages = {
        {{"id", 1}, {"parentFolder", nullptr}, {"name", std::string("Z Root")}, {"order", 2}},
        {{"id", 2}, {"parentFolder", nullptr}, {"name", std::string("A Root")}, {"order", 1}},
        {{"id", 3}, {"parentFolder", 1}, {"name", std::string("Z Child")}, {"order", 2}},
        {{"id", 4}, {"parentFolder", 1}, {"name", std::string("A Child")}, {"order", 1}},
        {{"id", 5}, {"parentFolder", 2}, {"name", std::string("B Child")}, {"order", 1}}
    };

    auto sort_by_name = [](const Page& a, const Page& b) {
        return name_of(a).compare(name_of(b));
    };
    auto result_by_name = build_tree_with_sort(pages, sort_by_name);

    REQUIRE(name_of(result_by_name[0]) == "A Root");
    REQUIRE(name_of(result_by_name[1]) == "Z Root");
    REQUIRE(name_of(items_of(result_by_name[1])[0]) == "A Child");
    REQUIRE(name_of(items_of(result_by_name[1])[1]) == "Z Child");
    REQUIRE(name_of(items_of(result_by_name[0])[0]) == "B Child");

    auto sort_by_order = [](const Page& a, const Page& b) {
        return std::get<int>(a.at("order")) - std::get<int>(b.at("order"));
    };
    auto result_by_order = build_tree_with_sort(pages, sort_by_order);

    REQUIRE(name_of(result_by_order[0]) == "A Root");
    REQUIRE(name_of(result_by_order[1]) == "Z Root");
}

TEST_CASE("empty and edge cases", "[build_tree_with_sort]") {
    REQUIRE(build_tree_with_sort({}).empty());

    std::vector<Page> root_only_pages = {
        {{"id", 1}, {"parentFolder", nullptr}, {"name", std::string("Root 1")}},
        {{"id", 2}, {"parentFolder", nullptr}, {"name", std::string("Root 2")}}
    };
    auto result = build_tree_with_sort(root_only_pages);

    REQUIRE(result.size() == 2);
    REQUIRE(items_of(result[0]).empty());
    REQUIRE(items_of(result[1]).empty());

    std::vector<Page> pages_with_orphans = {
        {{"id", 1}, {"parentFolder", nullptr}, {"name", std::string("Root")}},
        {{"id", 2}, {"parentFolder", 999}, {"name", std::string("Orphan")}},
        {{"id", 3}, {"parentFolder", 1}, {"name", std::string("Valid Child")}}
    };
    result = build_tree_with_sort(pages_with_orphans);

    REQUIRE(result.size() == 1);
    REQUIRE(items_of(result[0]).size() == 1);
    REQUIRE(name_of(items_of(result[0])[0]) == "Valid Child");
}

TEST_CASE("input validation and default root handling", "[build_tree_with_sort]") {
    REQUIRE_THROWS_AS(build_tree_with_sort(std::vector<Page>{{{"name", std::string("No ID")}}}),
                      std::invalid_argument);
    REQUIRE_THROWS_AS(build_tree_with_sort(std::vector<Page>{{{"id", nullptr}, {"name", std::string("Null ID")}}}),
                      std::invalid_argument);

    std::vector<Page> valid_pages = {
        {{"id", 1}, {"name", std::string("Page 1")}},
        {{"id", 2}, {"name", std::string("Page 2")}}
    };
    auto result = build_tree_with_sort(valid_pages);

    REQUIRE(result.size() == 2);
    REQUIRE(id_of(result[0]) == 1);
    REQUIRE(id_of(result[1]) == 2);
    REQUIRE(items_of(result[0]).empty());
    REQUIRE(items_of(result[1]).empty());
}
