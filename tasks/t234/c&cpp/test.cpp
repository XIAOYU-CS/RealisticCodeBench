TEST_CASE("compute_bezier_curve_point", "[Bezier]") {
    SECTION("should return the midpoint of two points") {
        std::vector<Coordinates> points = {{0, 0}, {2, 2}};
        Coordinates result = compute_bezier_curve_point(0.5, points);
        REQUIRE(result.x == Approx(1));
        REQUIRE(result.y == Approx(1));
    }

    SECTION("should return the correct point on a quadratic Bézier curve") {
        std::vector<Coordinates> points = {{0, 0}, {1, 2}, {2, 0}};
        Coordinates result = compute_bezier_curve_point(0.5, points);
        REQUIRE(result.x == Approx(1));
        REQUIRE(result.y == Approx(1));
    }

    SECTION("should return the correct point on a cubic Bézier curve") {
        std::vector<Coordinates> points = {{0, 0}, {1, 3}, {3, 1}, {4, 0}};
        Coordinates result = compute_bezier_curve_point(0.5, points);
        REQUIRE(result.x == Approx(2));
        REQUIRE(result.y == Approx(1.5));
    }

    SECTION("should return the only point when there is a single control point") {
        std::vector<Coordinates> points = {{5, 5}};
        Coordinates result = compute_bezier_curve_point(0.5, points);
        REQUIRE(result.x == Approx(5));
        REQUIRE(result.y == Approx(5));
    }

    SECTION("should return the first control point when t is 0") {
        std::vector<Coordinates> points = {{0, 0}, {5, 5}};
        Coordinates result = compute_bezier_curve_point(0, points);
        REQUIRE(result.x == Approx(0));
        REQUIRE(result.y == Approx(0));
    }

    SECTION("should return the last control point when t is 1") {
        std::vector<Coordinates> points = {{0, 0}, {5, 5}};
        Coordinates result = compute_bezier_curve_point(1, points);
        REQUIRE(result.x == Approx(5));
        REQUIRE(result.y == Approx(5));
    }
}