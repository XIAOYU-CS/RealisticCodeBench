TEST_CASE("get_line_segment_intersection behavior", "[intersection]") {
    SECTION("crossing segments intersect") {
        std::pair<std::pair<double, double>, std::pair<double, double>> seg1{{1.0, 1.0}, {4.0, 4.0}};
        std::pair<std::pair<double, double>, std::pair<double, double>> seg2{{1.0, 4.0}, {4.0, 1.0}};

        auto result = get_line_segment_intersection(seg1, seg2);

        REQUIRE_FALSE(result.isNone);
        REQUIRE(result.point.first == Approx(2.5));
        REQUIRE(result.point.second == Approx(2.5));
    }

    SECTION("separated collinear segments do not intersect") {
        std::pair<std::pair<double, double>, std::pair<double, double>> seg1{{1.0, 1.0}, {2.0, 2.0}};
        std::pair<std::pair<double, double>, std::pair<double, double>> seg2{{3.0, 3.0}, {4.0, 4.0}};

        auto result = get_line_segment_intersection(seg1, seg2);

        REQUIRE(result.isNone);
    }

    SECTION("parallel segments do not intersect") {
        std::pair<std::pair<double, double>, std::pair<double, double>> seg1{{1.0, 1.0}, {2.0, 2.0}};
        std::pair<std::pair<double, double>, std::pair<double, double>> seg2{{1.0, 2.0}, {2.0, 3.0}};

        auto result = get_line_segment_intersection(seg1, seg2);

        REQUIRE(result.isNone);
    }

    SECTION("intersection outside segment bounds returns none") {
        std::pair<std::pair<double, double>, std::pair<double, double>> seg1{{1.0, 1.0}, {3.0, 3.0}};
        std::pair<std::pair<double, double>, std::pair<double, double>> seg2{{3.0, 2.0}, {4.0, 2.0}};

        auto result = get_line_segment_intersection(seg1, seg2);

        REQUIRE(result.isNone);
    }

    SECTION("large coordinate segments intersect") {
        std::pair<std::pair<double, double>, std::pair<double, double>> seg1{{1000.0, 1000.0}, {2000.0, 2000.0}};
        std::pair<std::pair<double, double>, std::pair<double, double>> seg2{{1000.0, 2000.0}, {2000.0, 1000.0}};

        auto result = get_line_segment_intersection(seg1, seg2);

        REQUIRE_FALSE(result.isNone);
        REQUIRE(result.point.first == Approx(1500.0));
        REQUIRE(result.point.second == Approx(1500.0));
    }
}
