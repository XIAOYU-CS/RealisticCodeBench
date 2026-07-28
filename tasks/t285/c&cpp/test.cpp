TEST_CASE("Gaussian Weight Calculation Tests") {

    SECTION("Zero Intensity Difference") {
        float intensity_diff = 0.0f;
        float sigma_color = 1.0f;
        REQUIRE(gaussian_weight(intensity_diff, sigma_color) == Approx(1.0f).epsilon(0.001));
    }

    SECTION("Positive Intensity Difference") {
        float intensity_diff = 2.0f;
        float sigma_color = 2.0f;
        float expected_weight = exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        REQUIRE(gaussian_weight(intensity_diff, sigma_color) == Approx(expected_weight).epsilon(0.001));
    }

    SECTION("Negative Intensity Difference") {
        float intensity_diff = -2.0f;
        float sigma_color = 2.0f;
        float expected_weight = exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        REQUIRE(gaussian_weight(intensity_diff, sigma_color) == Approx(expected_weight).epsilon(0.001));
    }

    SECTION("Small Sigma Color") {
        float intensity_diff = 1.0f;
        float sigma_color = 0.1f;
        float expected_weight = exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        REQUIRE(gaussian_weight(intensity_diff, sigma_color) == Approx(expected_weight).epsilon(0.001));
    }

    SECTION("Large Sigma Color") {
        float intensity_diff = 1.0f;
        float sigma_color = 100.0f;
        float expected_weight = exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        REQUIRE(gaussian_weight(intensity_diff, sigma_color) == Approx(expected_weight).epsilon(0.001));
    }
}