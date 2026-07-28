#include <cmath>

namespace {

Pose pose(double x, double y, double z, double qx = 0.0, double qy = 0.0, double qz = 0.0, double qw = 1.0) {
    return Pose(Position(x, y, z), Quaternion(qx, qy, qz, qw));
}

SDF sdfWithLinks(const std::string& parent, const std::string& child) {
    SDF sdf;
    sdf.addElement("parentLink", parent);
    sdf.addElement("childLink", child);
    return sdf;
}

void requireApprox(double actual, double expected) {
    REQUIRE(actual == Approx(expected).epsilon(1e-12));
}

}  // namespace

TEST_CASE("LinkStaticTFPublisher load behavior") {
    const LinkStaticTFPublisher publisher;

    SECTION("rejects null model") {
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");

        const LoadResult result = publisher.load(nullptr, sdf);

        REQUIRE_FALSE(result.success);
        REQUIRE(result.errorMessage.find("Invalid model pointer") != std::string::npos);
        REQUIRE_FALSE(result.tfBroadcaster.wasSendTransformCalled());
    }

    SECTION("rejects missing parentLink") {
        Model model({Link("gripper_link", pose(0, 0, 0))});
        SDF sdf;
        sdf.addElement("childLink", "gripper_link");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE_FALSE(result.success);
        REQUIRE(result.errorMessage.find("parentLink") != std::string::npos);
        REQUIRE_FALSE(result.tfBroadcaster.wasSendTransformCalled());
    }

    SECTION("rejects missing childLink") {
        Model model({Link("arm_link", pose(0, 0, 0))});
        SDF sdf;
        sdf.addElement("parentLink", "arm_link");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE_FALSE(result.success);
        REQUIRE(result.errorMessage.find("childLink") != std::string::npos);
        REQUIRE_FALSE(result.tfBroadcaster.wasSendTransformCalled());
    }

    SECTION("publishes transform with default namespace and suffix removal") {
        Model model({
            Link("arm_link", pose(1, 2, 3)),
            Link("gripper_link", pose(4, 6, 8))
        });
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE(result.success);
        REQUIRE(result.tfBroadcaster.wasSendTransformCalled());
        const TransformStamped& transform = result.tfBroadcaster.getLastTransform();
        REQUIRE(transform.frame_id == "/arm");
        REQUIRE(transform.child_frame_id == "/gripper");
        requireApprox(transform.translation.x, 3.0);
        requireApprox(transform.translation.y, 4.0);
        requireApprox(transform.translation.z, 5.0);
    }

    SECTION("normalizes namespace and falls back from invalid policy") {
        Model model({
            Link("arm_link", pose(0, 0, 0)),
            Link("gripper_link", pose(0, 0, 0))
        });
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");
        sdf.addElement("robotNamespace", SDFElement("robot"));
        sdf.addElement("frameNamePolicy", "bad_policy");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE(result.success);
        const TransformStamped& transform = result.tfBroadcaster.getLastTransform();
        REQUIRE(transform.frame_id == "robot/arm");
        REQUIRE(transform.child_frame_id == "robot/gripper");
    }

    SECTION("keeps original frame names when requested") {
        Model model({
            Link("arm_link", pose(0, 0, 0)),
            Link("gripper_link", pose(0, 0, 0))
        });
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");
        sdf.addElement("frameNamePolicy", "keep_original");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE(result.success);
        const TransformStamped& transform = result.tfBroadcaster.getLastTransform();
        REQUIRE(transform.frame_id == "/arm_link");
        REQUIRE(transform.child_frame_id == "/gripper_link");
    }

    SECTION("adds frame prefix when requested") {
        Model model({
            Link("arm_link", pose(0, 0, 0)),
            Link("gripper_link", pose(0, 0, 0))
        });
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");
        sdf.addElement("robotNamespace", SDFElement("robot/"));
        sdf.addElement("frameNamePolicy", "add_prefix");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE(result.success);
        const TransformStamped& transform = result.tfBroadcaster.getLastTransform();
        REQUIRE(transform.frame_id == "robot/frame_arm_link");
        REQUIRE(transform.child_frame_id == "robot/frame_gripper_link");
    }

    SECTION("rejects missing model links") {
        Model model({Link("arm_link", pose(0, 0, 0))});
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE_FALSE(result.success);
        REQUIRE(result.errorMessage.find("Child link \"gripper_link\"") != std::string::npos);
        REQUIRE_FALSE(result.tfBroadcaster.wasSendTransformCalled());
    }

    SECTION("computes relative rotation") {
        Model model({
            Link("arm_link", pose(0, 0, 0, 0, 0, 1, 0)),
            Link("gripper_link", pose(0, 0, 0, 0, 0, 0, 1))
        });
        SDF sdf = sdfWithLinks("arm_link", "gripper_link");

        const LoadResult result = publisher.load(&model, sdf);

        REQUIRE(result.success);
        const Quaternion& rotation = result.tfBroadcaster.getLastTransform().rotation;
        requireApprox(rotation.x, 0.0);
        requireApprox(rotation.y, 0.0);
        requireApprox(rotation.z, -1.0);
        requireApprox(rotation.w, 0.0);
    }
}
