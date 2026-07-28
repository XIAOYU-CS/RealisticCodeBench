TEST_CASE("compute_remaining_loan_payment") {
    SECTION("calculates remaining balance for typical loan conditions") {
        REQUIRE(compute_remaining_loan_payment(10000, 0.005, 24) == Approx(0.0).margin(0.01));
    }

    SECTION("calculates remaining balance for high interest rate") {
        REQUIRE(compute_remaining_loan_payment(10000, 0.1, 12) == Approx(0.0).margin(0.01));
    }

    SECTION("calculates remaining balance for low interest rate") {
        REQUIRE(compute_remaining_loan_payment(10000, 0.001, 60) == Approx(0.0).margin(0.01));
    }

    SECTION("calculates remaining balance for very short term") {
        REQUIRE(compute_remaining_loan_payment(10000, 0.005, 1) == Approx(0.0).margin(0.01));
    }

    SECTION("calculates remaining balance with no payments") {
        REQUIRE(compute_remaining_loan_payment(10000, 0.005, 0) == Approx(10000.0).margin(0.01));
    }

    SECTION("calculates remaining balance for a long term") {
        REQUIRE(compute_remaining_loan_payment(10000, 0.005, 360) == Approx(0.0).margin(0.01));
    }
}
