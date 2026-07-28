TEST_CASE("2d_bilinear_interpolation") {
    int batch_size = 1;
    int dim = 2;
    int num_features = 1;

    std::vector<std::vector<double>> voxel_min(batch_size, std::vector<double>(dim, 0.0));
    std::vector<std::vector<double>> voxel_max(batch_size, std::vector<double>(dim, 2.0));

    std::vector<std::vector<double>> x(batch_size, std::vector<double>(dim, 1.0));

    std::vector<std::vector<std::vector<double>>> vertex_embeds = {{{0.0}, {2.0}, {4.0}, {6.0}}};

    std::vector<std::vector<double>> expected = {{3.0}};

    auto result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim);
    REQUIRE(result.size() == expected.size());
    for (size_t i = 0; i < result.size(); ++i) {
        REQUIRE(result[i].size() == expected[i].size());
        for (size_t j = 0; j < result[i].size(); ++j) {
            REQUIRE(result[i][j] == Approx(expected[i][j]).margin(1e-6));
        }
    }
}

TEST_CASE("3d_trilinear_interpolation") {
    int batch_size = 1;
    int dim = 3;
    int num_features = 1;

    std::vector<std::vector<double>> voxel_min(batch_size, std::vector<double>(dim, 0.0));
    std::vector<std::vector<double>> voxel_max(batch_size, std::vector<double>(dim, 2.0));

    std::vector<std::vector<double>> x(batch_size, std::vector<double>(dim, 1.0));

    std::vector<std::vector<std::vector<double>>> vertex_embeds = {{{0.0}, {1.0}, {2.0}, {3.0}, {4.0}, {5.0}, {6.0}, {7.0}}};

    std::vector<std::vector<double>> expected = {{3.5}};

    auto result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim);
    REQUIRE(result.size() == expected.size());
    for (size_t i = 0; i < result.size(); ++i) {
        REQUIRE(result[i].size() == expected[i].size());
        for (size_t j = 0; j < result[i].size(); ++j) {
            REQUIRE(result[i][j] == Approx(expected[i][j]).margin(1e-6));
        }
    }
}

TEST_CASE("1d_linear_interpolation") {
    int batch_size = 1;
    int dim = 1;
    int num_features = 1;

    std::vector<std::vector<double>> voxel_min(batch_size, std::vector<double>(dim, 0.0));
    std::vector<std::vector<double>> voxel_max(batch_size, std::vector<double>(dim, 4.0));

    std::vector<std::vector<double>> x(batch_size, std::vector<double>(dim, 2.0));

    std::vector<std::vector<std::vector<double>>> vertex_embeds = {{{2.0}, {6.0}}};

    std::vector<std::vector<double>> expected = {{4.0}};

    auto result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim);
    REQUIRE(result.size() == expected.size());
    for (size_t i = 0; i < result.size(); ++i) {
        REQUIRE(result[i].size() == expected[i].size());
        for (size_t j = 0; j < result[i].size(); ++j) {
            REQUIRE(result[i][j] == Approx(expected[i][j]).margin(1e-6));
        }
    }
}

TEST_CASE("interpolation_at_vertex") {
    int batch_size = 1;
    int dim = 2;
    int num_features = 1;

    std::vector<std::vector<double>> voxel_min(batch_size, std::vector<double>(dim, 0.0));
    std::vector<std::vector<double>> voxel_max(batch_size, std::vector<double>(dim, 1.0));

    std::vector<std::vector<double>> x(batch_size, std::vector<double>(dim, 1.0));

    std::vector<std::vector<std::vector<double>>> vertex_embeds = {{{10.0}, {20.0}, {30.0}, {40.0}}};

    std::vector<std::vector<double>> expected = {{40.0}};

    auto result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim);
    REQUIRE(result.size() == expected.size());
    for (size_t i = 0; i < result.size(); ++i) {
        REQUIRE(result[i].size() == expected[i].size());
        for (size_t j = 0; j < result[i].size(); ++j) {
            REQUIRE(result[i][j] == Approx(expected[i][j]).margin(1e-6));
        }
    }
}

TEST_CASE("batch_multi_feature_interpolation") {
    int dim = 2;

    std::vector<std::vector<double>> voxel_min = {
        {0.0, 0.0},
        {10.0, -2.0}
    };
    std::vector<std::vector<double>> voxel_max = {
        {2.0, 4.0},
        {14.0, 2.0}
    };
    std::vector<std::vector<double>> x = {
        {0.5, 1.0},
        {13.0, 1.0}
    };

    std::vector<std::vector<std::vector<double>>> vertex_embeds = {
        {
            {0.0, 0.0},
            {4.0, 8.0},
            {8.0, 16.0},
            {12.0, 24.0}
        },
        {
            {10.0, 100.0},
            {20.0, 200.0},
            {30.0, 300.0},
            {50.0, 500.0}
        }
    };
    std::vector<std::vector<double>> expected = {
        {3.0, 6.0},
        {38.125, 381.25}
    };

    auto result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim);
    REQUIRE(result.size() == expected.size());
    for (size_t i = 0; i < result.size(); ++i) {
        REQUIRE(result[i].size() == expected[i].size());
        for (size_t j = 0; j < result[i].size(); ++j) {
            REQUIRE(result[i][j] == Approx(expected[i][j]).margin(1e-6));
        }
    }
}
