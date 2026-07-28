#include <cmath>

TEST_CASE("TrapezoidalRule Test Cases", "[trapezoidal_integral]") {
    SECTION("constant function over unit interval") {
        REQUIRE(trapezoidal_integral([](double) { return 1.0; }, 0.0, 1.0, 100) == Approx(1.0).epsilon(1e-6));
    }

    SECTION("linear function over unit interval") {
        REQUIRE(trapezoidal_integral([](double x) { return x; }, 0.0, 1.0, 100) == Approx(0.5).epsilon(1e-6));
    }

    SECTION("quadratic function over unit interval") {
        REQUIRE(trapezoidal_integral([](double x) { return x * x; }, 0.0, 1.0, 1000) == Approx(1.0 / 3.0).epsilon(1e-6));
    }

    SECTION("sine function over zero to pi") {
        const double pi = std::acos(-1.0);
        REQUIRE(trapezoidal_integral([](double x) { return std::sin(x); }, 0.0, pi, 1000) == Approx(2.0).epsilon(1e-6));
    }

    SECTION("exponential function over unit interval") {
        REQUIRE(trapezoidal_integral([](double x) { return std::exp(x); }, 0.0, 1.0, 1000) == Approx(std::exp(1.0) - 1.0).epsilon(1e-6));
    }
}
