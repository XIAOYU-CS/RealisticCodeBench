#include <cstdint>
#include <vector>

TEST_CASE("Test Frame compute_stereo_from_rgbd with valid float32 depth map") {
    Frame frame(2);
    frame.mvKeys[0] = {100.0f, 200.0f};
    frame.mvKeys[1] = {300.0f, 400.0f};
    frame.mvKeysUn[0] = {105.0f, 205.0f};
    frame.mvKeysUn[1] = {305.0f, 405.0f};

    std::vector<std::vector<float>> depth_map(500, std::vector<float>(500, 1000.0f));
    depth_map[200][100] = 500.0f;
    depth_map[400][300] = 250.0f;

    frame.compute_stereo_from_rgbd(depth_map);

    REQUIRE(frame.mvDepth[0] == Approx(500.0f));
    REQUIRE(frame.mvuRight[0] == Approx(105.0f - (5000.0f / 500.0f)));
    REQUIRE(frame.mvDepth[1] == Approx(250.0f));
    REQUIRE(frame.mvuRight[1] == Approx(305.0f - (5000.0f / 250.0f)));
}

TEST_CASE("Test Frame compute_stereo_from_rgbd with valid uint16 depth map") {
    Frame frame(2);
    frame.mvKeys[0] = {100.0f, 200.0f};
    frame.mvKeys[1] = {300.0f, 400.0f};
    frame.mvKeysUn[0] = {105.0f, 205.0f};
    frame.mvKeysUn[1] = {305.0f, 405.0f};

    std::vector<std::vector<uint16_t>> depth_map(500, std::vector<uint16_t>(500, 1000));
    depth_map[200][100] = 500;
    depth_map[400][300] = 250;

    frame.compute_stereo_from_rgbd(depth_map);

    REQUIRE(frame.mvDepth[0] == Approx(0.5f));
    REQUIRE(frame.mvuRight[0] == Approx(105.0f - (5000.0f / 0.5f)));
    REQUIRE(frame.mvDepth[1] == Approx(0.25f));
    REQUIRE(frame.mvuRight[1] == Approx(305.0f - (5000.0f / 0.25f)));
}

TEST_CASE("Test Frame compute_stereo_from_rgbd with empty depth map") {
    Frame frame(2);
    
    REQUIRE_THROWS_AS(frame.compute_stereo_from_rgbd(std::vector<std::vector<float>>()), std::invalid_argument);
}

TEST_CASE("Test Frame compute_stereo_from_rgbd with unsupported depth type") {
    Frame frame(2);
    std::vector<std::vector<uint8_t>> invalid_map(500, std::vector<uint8_t>(500, 1));

    REQUIRE_THROWS_WITH(
        frame.compute_stereo_from_rgbd(invalid_map),
        "Unsupported depth image type. Supported types: float32, uint16");
}

TEST_CASE("Test Frame compute_stereo_from_rgbd with keypoints out of bounds") {
    Frame frame(2);
    frame.mvKeys[0] = {100.0f, 200.0f};
    frame.mvKeys[1] = {300.0f, 400.0f};
    frame.mvKeysUn[0] = {105.0f, 205.0f};
    frame.mvKeysUn[1] = {305.0f, 405.0f};

    std::vector<std::vector<float>> depth_map(200, std::vector<float>(200, 1000.0f));

    frame.compute_stereo_from_rgbd(depth_map);

    REQUIRE(frame.mvDepth[0] == -1.0f);
    REQUIRE(frame.mvuRight[0] == -1.0f);
    REQUIRE(frame.mvDepth[1] == -1.0f);
    REQUIRE(frame.mvuRight[1] == -1.0f);
}
