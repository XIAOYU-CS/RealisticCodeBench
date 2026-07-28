namespace {
double number(const std::map<std::string, std::any>& values, const std::string& key) {
    return std::any_cast<double>(values.at(key));
}

int integer(const std::map<std::string, std::any>& values, const std::string& key) {
    return std::any_cast<int>(values.at(key));
}

const std::vector<std::map<std::string, std::any>>& schedule(
    const std::map<std::string, std::any>& values) {
    return std::any_cast<const std::vector<std::map<std::string, std::any>>&>(
        values.at("amortizationSchedule"));
}

bool near_cents(double actual, double expected) {
    return std::abs(actual - expected) < 0.02;
}
}

TEST_CASE("should calculate correct mortgage details for standard case") {
    auto result = calculate_mortgage_details(100000, 5, 30);

    REQUIRE(near_cents(number(result, "monthlyPayment"), 536.82));
    REQUIRE(near_cents(number(result, "totalInterest"), 93255.78));
    REQUIRE(near_cents(number(result, "totalCost"), 193255.78));
    REQUIRE(schedule(result).size() == 360);
}

TEST_CASE("should calculate correct mortgage details for 15 year loan") {
    auto result = calculate_mortgage_details(200000, 4.5, 15);

    REQUIRE(near_cents(number(result, "monthlyPayment"), 1529.99));
    REQUIRE(near_cents(number(result, "totalInterest"), 75397.58));
    REQUIRE(near_cents(number(result, "totalCost"), 275397.58));
    REQUIRE(schedule(result).size() == 180);
}

TEST_CASE("should calculate correct mortgage details for zero interest rate") {
    auto result = calculate_mortgage_details(120000, 0, 10);

    REQUIRE(near_cents(number(result, "monthlyPayment"), 1000));
    REQUIRE(near_cents(number(result, "totalInterest"), 0));
    REQUIRE(near_cents(number(result, "totalCost"), 120000));
    REQUIRE(schedule(result).size() == 120);
}

TEST_CASE("should handle small loan amount correctly") {
    auto result = calculate_mortgage_details(1000, 10, 1);

    REQUIRE(near_cents(number(result, "monthlyPayment"), 87.92));
    REQUIRE(near_cents(number(result, "totalInterest"), 54.99));
    REQUIRE(near_cents(number(result, "totalCost"), 1054.99));
    REQUIRE(schedule(result).size() == 12);
}

TEST_CASE("should validate amortization schedule structure") {
    auto result = calculate_mortgage_details(50000, 6, 5);
    const auto& amortization_schedule = schedule(result);

    REQUIRE(amortization_schedule.size() == 60);
    const auto& first_month = amortization_schedule[0];
    REQUIRE(integer(first_month, "month") == 1);
    REQUIRE(first_month.find("totalPayment") != first_month.end());
    REQUIRE(first_month.find("principalPayment") != first_month.end());
    REQUIRE(first_month.find("interestPayment") != first_month.end());
    REQUIRE(first_month.find("remainingPrincipal") != first_month.end());

    const auto& last_month = amortization_schedule[59];
    REQUIRE(integer(last_month, "month") == 60);
    REQUIRE(std::abs(number(last_month, "remainingPrincipal") - 0) < 1e-10);
}

TEST_CASE("should have decreasing remaining principal over time") {
    auto result = calculate_mortgage_details(100000, 5, 10);
    const auto& amortization_schedule = schedule(result);

    for (size_t i = 0; i < amortization_schedule.size() - 1; ++i) {
        REQUIRE(number(amortization_schedule[i], "remainingPrincipal") >=
                number(amortization_schedule[i + 1], "remainingPrincipal"));
    }

    REQUIRE(number(amortization_schedule[0], "remainingPrincipal") >
            number(amortization_schedule.back(), "remainingPrincipal"));
}

TEST_CASE("should have increasing principal payments over time") {
    auto result = calculate_mortgage_details(100000, 5, 10);
    const auto& amortization_schedule = schedule(result);

    for (size_t i = 0; i < 9; ++i) {
        REQUIRE(number(amortization_schedule[i], "principalPayment") <=
                number(amortization_schedule[i + 1], "principalPayment"));
    }
}

TEST_CASE("should have decreasing interest payments over time") {
    auto result = calculate_mortgage_details(100000, 5, 10);
    const auto& amortization_schedule = schedule(result);

    for (size_t i = 0; i < 9; ++i) {
        REQUIRE(number(amortization_schedule[i], "interestPayment") >=
                number(amortization_schedule[i + 1], "interestPayment"));
    }
}

TEST_CASE("should maintain consistent monthly payment throughout schedule") {
    auto result = calculate_mortgage_details(75000, 4.25, 20);
    const auto& amortization_schedule = schedule(result);
    auto first_payment = number(amortization_schedule[0], "totalPayment");

    for (size_t i = 0; i < std::min(size_t(12), amortization_schedule.size()); ++i) {
        REQUIRE(std::abs(number(amortization_schedule[i], "totalPayment") - first_payment) < 0.01);
    }
}

TEST_CASE("should calculate correct total interest as difference between total cost and principal") {
    double principal = 80000;
    double annual_rate = 6.5;
    int years = 15;

    auto result = calculate_mortgage_details(principal, annual_rate, years);

    REQUIRE(std::abs(number(result, "totalInterest") - (number(result, "totalCost") - principal)) < 0.01);
}

TEST_CASE("should prevent negative remaining principal due to floating point errors") {
    auto result = calculate_mortgage_details(100000, 5, 30);
    const auto& amortization_schedule = schedule(result);
    bool has_negative_principal = false;

    for (const auto& month : amortization_schedule) {
        if (number(month, "remainingPrincipal") < 0) {
            has_negative_principal = true;
            break;
        }
    }

    REQUIRE_FALSE(has_negative_principal);
}
