static void requireMatrixApprox(
    const std::vector<std::vector<double>>& actual,
    const std::vector<std::vector<double>>& expected) {
    REQUIRE(actual.size() == expected.size());
    for (size_t row = 0; row < expected.size(); ++row) {
        REQUIRE(actual[row].size() == expected[row].size());
        for (size_t col = 0; col < expected[row].size(); ++col) {
            REQUIRE(actual[row][col] == Approx(expected[row][col]).margin(1e-12));
        }
    }
}

TEST_CASE("Test Rotate Point Cloud", "[rotate_point_cloud_around_y_axis]") {
    SECTION("Test no rotation") {
        std::vector<std::vector<double>> pointCloud = {{1.0, 2.0, 3.0}};
        double rotationAngle = 0;
        std::vector<std::vector<double>> expectedOutput = {{1.0, 2.0, 3.0}};

        std::vector<std::vector<double>> rotatedPointCloud = rotate_point_cloud_around_y_axis(pointCloud, rotationAngle);

        requireMatrixApprox(rotatedPointCloud, expectedOutput);
    }

    SECTION("Test 180-degree rotation") {
        std::vector<std::vector<double>> pointCloud = {{1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}};
        double rotationAngle = M_PI;  // 180 degrees
        std::vector<std::vector<double>> expectedOutput = {{-1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}};

        std::vector<std::vector<double>> rotatedPointCloud = rotate_point_cloud_around_y_axis(pointCloud, rotationAngle);

        requireMatrixApprox(rotatedPointCloud, expectedOutput);
    }

    SECTION("Test full rotation") {
        std::vector<std::vector<double>> pointCloud = {{1.0, 2.0, 3.0}};
        double rotationAngle = 2 * M_PI;  // 360 degrees
        std::vector<std::vector<double>> expectedOutput = {{1.0, 2.0, 3.0}};

        std::vector<std::vector<double>> rotatedPointCloud = rotate_point_cloud_around_y_axis(pointCloud, rotationAngle);

        requireMatrixApprox(rotatedPointCloud, expectedOutput);
    }

    SECTION("Test 90-degree rotation") {
        std::vector<std::vector<double>> pointCloud = {{1.0, 0.0, 0.0}, {0.0, 0.0, 1.0}};
        double rotationAngle = M_PI / 2;
        std::vector<std::vector<double>> expectedOutput = {{0.0, 0.0, 1.0}, {-1.0, 0.0, 0.0}};

        std::vector<std::vector<double>> rotatedPointCloud = rotate_point_cloud_around_y_axis(pointCloud, rotationAngle);

        requireMatrixApprox(rotatedPointCloud, expectedOutput);
    }

    SECTION("Test empty point cloud") {
        std::vector<std::vector<double>> pointCloud;

        std::vector<std::vector<double>> rotatedPointCloud = rotate_point_cloud_around_y_axis(pointCloud, M_PI / 2);

        REQUIRE(rotatedPointCloud.empty());
    }
}
