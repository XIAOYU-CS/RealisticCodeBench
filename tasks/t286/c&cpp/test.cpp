TEST_CASE("Spatial Weight Calculation Tests") {

    SECTION("Zero Spatial Difference") {
        float spatial_diff = 0.0f;
        float sigma_space = 1.0f;
        REQUIRE(spatial_weight(spatial_diff, sigma_space) == Approx(1.0f).epsilon(0.001));
    }

    SECTION("Positive Spatial Difference") {
        float spatial_diff = 2.0f;
        float sigma_space = 2.0f;
        float expected_weight = exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        REQUIRE(spatial_weight(spatial_diff, sigma_space) == Approx(expected_weight).epsilon(0.001));
    }

    SECTION("Negative Spatial Difference") {
        float spatial_diff = -2.0f;
        float sigma_space = 2.0f;
        float expected_weight = exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        REQUIRE(spatial_weight(spatial_diff, sigma_space) == Approx(expected_weight).epsilon(0.001));
    }

    SECTION("Small Sigma Space") {
        float spatial_diff = 1.0f;
        float sigma_space = 0.1f;
        float expected_weight = exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        REQUIRE(spatial_weight(spatial_diff, sigma_space) == Approx(expected_weight).epsilon(0.001));
    }

    SECTION("Large Sigma Space") {
        float spatial_diff = 1.0f;
        float sigma_space = 100.0f;
        float expected_weight = exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        REQUIRE(spatial_weight(spatial_diff, sigma_space) == Approx(expected_weight).epsilon(0.001));
    }

}