#ifndef T374_SIGNATURE_CPP
#define T374_SIGNATURE_CPP

#include <string>
#include <unordered_map>
#include <vector>

struct Position {
    double x = 0.0;
    double y = 0.0;
    double z = 0.0;

    Position() = default;
    Position(double x, double y, double z);
};

struct Quaternion {
    double x = 0.0;
    double y = 0.0;
    double z = 0.0;
    double w = 1.0;

    Quaternion() = default;
    Quaternion(double x, double y, double z, double w);
};

struct Pose {
    Position pos;
    Quaternion rot;

    Pose() = default;
    Pose(Position pos, Quaternion rot);
};

class Link {
public:
    Link(std::string name, Pose worldPose);

    const std::string& getName() const;
    const Pose& worldPose() const;

private:
    std::string name_;
    Pose worldPose_;
};

class Model {
public:
    explicit Model(std::vector<Link> links);

    const Link* getLink(const std::string& name) const;
    const std::vector<Link>& getLinks() const;

private:
    std::vector<Link> links_;
};

class SDFElement {
public:
    SDFElement() = default;
    explicit SDFElement(std::string value);

    const std::string& get() const;

private:
    std::string value_;
};

class SDF {
public:
    void addElement(const std::string& name, const std::string& value);
    void addElement(const std::string& name, const SDFElement& value);
    bool hasElement(const std::string& name) const;
    SDFElement getElement(const std::string& name) const;
    std::string get(const std::string& name) const;

private:
    std::unordered_map<std::string, SDFElement> elements_;
};

struct TransformStamped {
    std::string stamp = "now";
    std::string frame_id;
    std::string child_frame_id;
    Position translation;
    Quaternion rotation;
};

class TFBroadcaster {
public:
    void sendTransform(const TransformStamped& transform);
    bool wasSendTransformCalled() const;
    const TransformStamped& getLastTransform() const;

private:
    bool sendTransformCalled_ = false;
    TransformStamped lastTransform_;
};

struct LoadResult {
    bool success = false;
    std::string errorMessage;
    TFBroadcaster tfBroadcaster;
};

class LinkStaticTFPublisher {
public:
    LoadResult load(const Model* model, const SDF& sdf) const;
};

std::string processFrameName(const std::string& linkName, const std::string& policy, const std::string& ns);
Pose subtractPoses(const Pose& pose1, const Pose& pose2);
Quaternion invertQuaternion(const Quaternion& quat);
Quaternion multiplyQuaternions(const Quaternion& a, const Quaternion& b);

#endif
