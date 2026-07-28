namespace {
void requirePointCloudClose(const PointCloud &actual, const PointCloud &expected) {
    REQUIRE(actual.size() == expected.size());
    for (std::size_t i = 0; i < actual.size(); ++i) {
        for (std::size_t j = 0; j < 3; ++j) {
            REQUIRE(std::fabs(actual[i][j] - expected[i][j]) < 1e-9);
        }
    }
}
}

TEST_CASE("Change Reference Frame") {
    const PointCloud pointCloud = {
        {1.0, 2.0, 3.0},
        {4.0, 5.0, 6.0},
        {7.0, 8.0, 9.0},
    };

    SECTION("Identity transformation") {
        const std::vector<Point3D> refFramePoints = {
            {0.0, 0.0, 0.0},
            {1.0, 0.0, 0.0},
            {0.0, 1.0, 0.0},
        };

        requirePointCloudClose(changeReferenceFrame(pointCloud, refFramePoints), pointCloud);
    }

    SECTION("Translation") {
        const std::vector<Point3D> refFramePoints = {
            {1.0, 1.0, 1.0},
            {2.0, 1.0, 1.0},
            {1.0, 2.0, 1.0},
        };
        const PointCloud expected = {
            {0.0, 1.0, 2.0},
            {3.0, 4.0, 5.0},
            {6.0, 7.0, 8.0},
        };

        requirePointCloudClose(changeReferenceFrame(pointCloud, refFramePoints), expected);
    }

    SECTION("Rotated axes") {
        const std::vector<Point3D> refFramePoints = {
            {0.0, 0.0, 0.0},
            {0.0, 1.0, 0.0},
            {0.0, 1.0, 1.0},
        };
        const PointCloud expected = {
            {3.0, 1.0, 2.0},
            {6.0, 4.0, 5.0},
            {9.0, 7.0, 8.0},
        };

        requirePointCloudClose(changeReferenceFrame(pointCloud, refFramePoints), expected);
    }

    SECTION("Non-orthogonal reference points") {
        const std::vector<Point3D> refFramePoints = {
            {0.0, 0.0, 0.0},
            {2.0, 0.0, 0.0},
            {2.0, 2.0, 0.0},
        };

        requirePointCloudClose(changeReferenceFrame(pointCloud, refFramePoints), pointCloud);
    }

    SECTION("Inverted frame") {
        const std::vector<Point3D> refFramePoints = {
            {0.0, 0.0, 0.0},
            {-1.0, 0.0, 0.0},
            {0.0, -1.0, 0.0},
        };
        const PointCloud expected = {
            {-1.0, -2.0, 3.0},
            {-4.0, -5.0, 6.0},
            {-7.0, -8.0, 9.0},
        };

        requirePointCloudClose(changeReferenceFrame(pointCloud, refFramePoints), expected);
    }

    SECTION("Rejects collinear reference points") {
        const std::vector<Point3D> refFramePoints = {
            {0.0, 0.0, 0.0},
            {1.0, 1.0, 1.0},
            {2.0, 2.0, 2.0},
        };

        REQUIRE_THROWS_AS(changeReferenceFrame(pointCloud, refFramePoints), std::invalid_argument);
    }
}
