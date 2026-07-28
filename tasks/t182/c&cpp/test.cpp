TEST_CASE("hash_recipe_id_to_price", "[hash_recipe_id_to_price]") {
    SECTION("should return a number within the default range for a given recipe ID") {
        double price = hash_recipe_id_to_price("recipe123");
        REQUIRE(price >= 10);
        REQUIRE(price <= 30);
    }

    SECTION("should return the same price for the same recipe ID") {
        double price1 = hash_recipe_id_to_price("recipe123");
        double price2 = hash_recipe_id_to_price("recipe123");
        REQUIRE(price1 == price2);
    }

    SECTION("should return different prices for different recipe IDs") {
        double price1 = hash_recipe_id_to_price("recipe123");
        double price2 = hash_recipe_id_to_price("recipe456");
        REQUIRE(price1 != price2);
    }

    SECTION("should return a price within a custom range") {
        double minVal = 20;
        double maxVal = 50;
        double price = hash_recipe_id_to_price("recipe789", minVal, maxVal);
        REQUIRE(price >= minVal);
        REQUIRE(price <= maxVal);
    }

    SECTION("should handle very long recipe IDs without error") {
        std::string longRecipeId = "recipe" + std::string(1000, 'A');
        double price = hash_recipe_id_to_price(longRecipeId);
        REQUIRE(price >= 10);
        REQUIRE(price <= 30);
    }
}