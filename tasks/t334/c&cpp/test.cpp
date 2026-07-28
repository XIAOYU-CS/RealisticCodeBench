TEST_CASE("rgb_format") {
    std::vector<uint8_t> data = {255, 0, 0, 0, 255, 0};
    auto result = opc_data_to_pixels(data, "rgb");
    REQUIRE(result == std::vector<std::tuple<float, float, float>>{{255.0f, 0.0f, 0.0f}, {0.0f, 255.0f, 0.0f}});
}

TEST_CASE("rgba_format") {
    std::vector<uint8_t> data = {0, 0, 255, 128};
    auto result = opc_data_to_pixels(data, "rgba");
    REQUIRE(result == std::vector<std::tuple<float, float, float>>{{0.0f, 0.0f, 255.0f}});
}

TEST_CASE("grb_format") {
    std::vector<uint8_t> data = {0, 255, 0};
    auto result = opc_data_to_pixels(data, "grb");
    REQUIRE(result == std::vector<std::tuple<float, float, float>>{{255.0f, 0.0f, 0.0f}});
}

TEST_CASE("bgr_format") {
    std::vector<uint8_t> data = {0, 0, 255};
    auto result = opc_data_to_pixels(data, "bgr");
    REQUIRE(result == std::vector<std::tuple<float, float, float>>{{255.0f, 0.0f, 0.0f}});
}

TEST_CASE("normalize_parameter") {
    std::vector<uint8_t> data = {255, 128, 0};
    auto result = opc_data_to_pixels(data, "rgb", true);
    REQUIRE(std::get<0>(result[0]) == Approx(1.0).margin(0.00001));
    REQUIRE(std::get<1>(result[0]) == Approx(128.0 / 255).margin(0.00001));
    REQUIRE(std::get<2>(result[0]) == Approx(0.0).margin(0.00001));
}
