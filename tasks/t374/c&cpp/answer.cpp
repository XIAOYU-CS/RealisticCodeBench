#include "signature.cpp"

#include <utility>

Position::Position(double x, double y, double z) : x(x), y(y), z(z) {}

Quaternion::Quaternion(double x, double y, double z, double w) : x(x), y(y), z(z), w(w) {}

Pose::Pose(Position pos, Quaternion rot) : pos(pos), rot(rot) {}

Link::Link(std::string name, Pose worldPose) : name_(std::move(name)), worldPose_(worldPose) {}

const std::string& Link::getName() const {
    return name_;
}

const Pose& Link::worldPose() const {
    return worldPose_;
}

Model::Model(std::vector<Link> links) : links_(std::move(links)) {}

const Link* Model::getLink(const std::string& name) const {
    for (const auto& link : links_) {
        if (link.getName() == name) {
            return &link;
        }
    }
    return nullptr;
}

const std::vector<Link>& Model::getLinks() const {
    return links_;
}

SDFElement::SDFElement(std::string value) : value_(std::move(value)) {}

const std::string& SDFElement::get() const {
    return value_;
}

void SDF::addElement(const std::string& name, const std::string& value) {
    elements_[name] = SDFElement(value);
}

void SDF::addElement(const std::string& name, const SDFElement& value) {
    elements_[name] = value;
}

bool SDF::hasElement(const std::string& name) const {
    return elements_.find(name) != elements_.end();
}

SDFElement SDF::getElement(const std::string& name) const {
    const auto it = elements_.find(name);
    return it == elements_.end() ? SDFElement() : it->second;
}

std::string SDF::get(const std::string& name) const {
    return getElement(name).get();
}

void TFBroadcaster::sendTransform(const TransformStamped& transform) {
    sendTransformCalled_ = true;
    lastTransform_ = transform;
}

bool TFBroadcaster::wasSendTransformCalled() const {
    return sendTransformCalled_;
}

const TransformStamped& TFBroadcaster::getLastTransform() const {
    return lastTransform_;
}

std::string processFrameName(const std::string& linkName, const std::string& policy, const std::string& ns) {
    std::string frameName = linkName;

    if (policy == "remove_suffix") {
        const auto pos = frameName.find("_link");
        if (pos != std::string::npos) {
            frameName.erase(pos, std::string("_link").size());
        }
    } else if (policy == "add_prefix") {
        frameName = "frame_" + frameName;
    }

    return ns + frameName;
}

Pose subtractPoses(const Pose& pose1, const Pose& pose2) {
    Position pos(
        pose1.pos.x - pose2.pos.x,
        pose1.pos.y - pose2.pos.y,
        pose1.pos.z - pose2.pos.z
    );
    return Pose(pos, multiplyQuaternions(invertQuaternion(pose2.rot), pose1.rot));
}

Quaternion invertQuaternion(const Quaternion& quat) {
    return Quaternion(-quat.x, -quat.y, -quat.z, quat.w);
}

Quaternion multiplyQuaternions(const Quaternion& a, const Quaternion& b) {
    return Quaternion(
        a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
        a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
        a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
        a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
    );
}

LoadResult LinkStaticTFPublisher::load(const Model* model, const SDF& sdf) const {
    LoadResult result;

    if (model == nullptr) {
        result.errorMessage = "[LinkStaticTFPublisher]: Invalid model pointer! Unable to load component";
        return result;
    }

    std::string robotNamespace = "/";
    if (sdf.hasElement("robotNamespace")) {
        robotNamespace = sdf.getElement("robotNamespace").get();
        if (!robotNamespace.empty() && robotNamespace.back() != '/') {
            robotNamespace += "/";
        }
    }

    std::string frameNamePolicy = "remove_suffix";
    if (sdf.hasElement("frameNamePolicy")) {
        frameNamePolicy = sdf.get("frameNamePolicy");
        if (frameNamePolicy != "remove_suffix" &&
            frameNamePolicy != "keep_original" &&
            frameNamePolicy != "add_prefix") {
            frameNamePolicy = "remove_suffix";
        }
    }

    if (!sdf.hasElement("parentLink")) {
        result.errorMessage = "[LinkStaticTFPublisher]: Missing required element 'parentLink' in SDF configuration";
        return result;
    }
    const std::string parentLinkName = sdf.get("parentLink");

    if (!sdf.hasElement("childLink")) {
        result.errorMessage = "[LinkStaticTFPublisher]: Missing required element 'childLink' in SDF configuration";
        return result;
    }
    const std::string childLinkName = sdf.get("childLink");

    const Link* parentLink = model->getLink(parentLinkName);
    if (parentLink == nullptr) {
        result.errorMessage = "[LinkStaticTFPublisher]: Parent link \"" + parentLinkName + "\" does not exist in model";
        return result;
    }

    const Link* childLink = model->getLink(childLinkName);
    if (childLink == nullptr) {
        result.errorMessage = "[LinkStaticTFPublisher]: Child link \"" + childLinkName + "\" does not exist in model";
        return result;
    }

    const Pose relativePose = subtractPoses(childLink->worldPose(), parentLink->worldPose());
    TransformStamped transform;
    transform.frame_id = processFrameName(parentLinkName, frameNamePolicy, robotNamespace);
    transform.child_frame_id = processFrameName(childLinkName, frameNamePolicy, robotNamespace);
    transform.translation = relativePose.pos;
    transform.rotation = relativePose.rot;

    result.tfBroadcaster.sendTransform(transform);
    result.success = true;
    return result;
}
