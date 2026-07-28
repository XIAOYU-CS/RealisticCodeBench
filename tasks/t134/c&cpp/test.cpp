TEST_CASE("TestGetTInLog10Kelvin", "[TemperatureConversion]") {
    SECTION("test_scalar_input_high_temperature") {
        double T_keV = 100.0;
        double expected_result = std::log10(T_keV / k_B_over_keV);
        REQUIRE(std::abs(convert_keV_to_log10_Kelvin(T_keV) - expected_result) < 1e-6);
    }

    SECTION("test_scalar_input_low_temperature") {
        double T_keV = 0.01;
        double expected_result = std::log10(T_keV / k_B_over_keV);
        REQUIRE(std::abs(convert_keV_to_log10_Kelvin(T_keV) - expected_result) < 1e-6);
    }

    SECTION("test_tuple_input_large_range") {
        std::vector<double> T_keV = {0.1, 1.0, 10.0, 100.0, 1000.0};
        std::vector<double> expected_results;
        for (double t : T_keV) {
            expected_results.push_back(std::log10(t / k_B_over_keV));
        }
        auto result = convert_keV_to_log10_Kelvin(T_keV);
        REQUIRE(result == expected_results);
    }

    SECTION("test_tuple_input_repeated_values") {
        std::vector<double> T_keV = {1.0, 1.0, 1.0};
        std::vector<double> expected_results;
        for (double t : T_keV) {
            expected_results.push_back(std::log10(t / k_B_over_keV));
        }
        auto result = convert_keV_to_log10_Kelvin(T_keV);
        REQUIRE(result == expected_results);
    }

    SECTION("test_scalar_input_non_integer") {
        double T_keV = 2.5;
        double expected_result = std::log10(T_keV / k_B_over_keV);
        REQUIRE(std::abs(convert_keV_to_log10_Kelvin(T_keV) - expected_result) < 1e-6);
    }

    SECTION("test_tuple_input_floating_point") {
        std::vector<double> T_keV = {1.5, 2.5, 3.5};
        std::vector<double> expected_results;
        for (double t : T_keV) {
            expected_results.push_back(std::log10(t / k_B_over_keV));
        }
        auto result = convert_keV_to_log10_Kelvin(T_keV);
        REQUIRE(result == expected_results);
    }

    SECTION("test_large_tuple_input") {
        std::vector<double> T_keV;
        for (double i = 1.0; i <= 1000.0; ++i) {
            T_keV.push_back(i);
        }
        std::vector<double> expected_results;
        for (double t : T_keV) {
            expected_results.push_back(std::log10(t / k_B_over_keV));
        }
        auto result = convert_keV_to_log10_Kelvin(T_keV);
        REQUIRE(result == expected_results);
    }
}
