package org.real.temp;

import java.util.*;
import java.util.logging.Logger;
import java.util.logging.Level;

public class Answer {

    private static final Logger logger = Logger.getLogger(Answer.class.getName());

    public static class Pose {
        public Position pos;
        public Quaternion rot;

        public Pose(Position pos, Quaternion rot) {
            this.pos = pos;
            this.rot = rot;
        }
    }

    public static class Position {
        public double x, y, z;

        public Position(double x, double y, double z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    public static class Quaternion {
        public double x, y, z, w;

        public Quaternion(double x, double y, double z, double w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }

    public static class Link {
        private String name;
        private Pose worldPose;

        public Link(String name, Pose worldPose) {
            this.name = name;
            this.worldPose = worldPose;
        }

        public String getName() {
            return name;
        }

        public Pose worldPose() {
            return worldPose;
        }
    }

    public static class Model {
        private List<Link> links;

        public Model(List<Link> links) {
            this.links = links;
        }

        public Link getLink(String name) {
            for (Link link : links) {
                if (link.getName().equals(name)) {
                    return link;
                }
            }
            return null;
        }

        public List<Link> getLinks() {
            return links;
        }
    }

    public static class SDFElement {
        private String value;

        public SDFElement(String value) {
            this.value = value;
        }

        public String get() {
            return value;
        }
    }

    public static class SDF {
        private Map<String, Object> elements;

        public SDF() {
            this.elements = new HashMap<>();
        }

        public void addElement(String name, Object value) {
            elements.put(name, value);
        }

        public boolean hasElement(String name) {
            return elements.containsKey(name);
        }

        public SDFElement getElement(String name) {
            return (SDFElement) elements.get(name);
        }

        public String get(String name) {
            Object value = elements.get(name);
            if (value instanceof SDFElement) {
                return ((SDFElement) value).get();
            }
            return (String) value;
        }
    }

    public static class TFBroadcaster {
        private boolean sendTransformCalled = false;
        private Map<String, Object> lastTransform = new HashMap<>();

        public void sendTransform(Map<String, Object> transform) {
            sendTransformCalled = true;
            lastTransform = transform;
        }

        public boolean wasSendTransformCalled() {
            return sendTransformCalled;
        }

        public Map<String, Object> getLastTransform() {
            return lastTransform;
        }
    }

    public static String processFrameName(String linkName, String policy, String ns) {
        String frameName = linkName;

        if ("remove_suffix".equals(policy)) {
            if (frameName.contains("_link")) {
                frameName = frameName.replace("_link", "");
                logger.fine("[LinkStaticTFPublisher]: Removed _link suffix - Original: " + linkName + ", Processed: " + frameName);
            } else {
                logger.fine("[LinkStaticTFPublisher]: Link name does not contain _link suffix, keeping original: " + linkName);
            }
        } else if ("add_prefix".equals(policy)) {
            frameName = "frame_" + frameName;
            logger.fine("[LinkStaticTFPublisher]: Added frame_ prefix - Original: " + linkName + ", Processed: " + frameName);
        }

        return ns + frameName;
    }

    public static Pose subtractPoses(Pose pose1, Pose pose2) {
        Position pos = new Position(
            pose1.pos.x - pose2.pos.x,
            pose1.pos.y - pose2.pos.y,
            pose1.pos.z - pose2.pos.z
        );

        Quaternion invRot2 = invertQuaternion(pose2.rot);
        Quaternion rot = multiplyQuaternions(invRot2, pose1.rot);

        return new Pose(pos, rot);
    }

    public static Quaternion invertQuaternion(Quaternion quat) {
        return new Quaternion(-quat.x, -quat.y, -quat.z, quat.w);
    }

    public static Quaternion multiplyQuaternions(Quaternion a, Quaternion b) {
        return new Quaternion(
            a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
            a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
            a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
            a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
        );
    }

    public static class LoadResult {
        public boolean success;
        public String errorMessage;
        public TFBroadcaster tfBroadcaster;

        public LoadResult(boolean success, String errorMessage, TFBroadcaster tfBroadcaster) {
            this.success = success;
            this.errorMessage = errorMessage;
            this.tfBroadcaster = tfBroadcaster;
        }
    }

    public static LoadResult load(Model model, SDF sdf) {
        TFBroadcaster tfBroadcaster = new TFBroadcaster();

        if (model == null) {
            logger.severe("[LinkStaticTFPublisher]: Invalid model pointer! Unable to load component");
            return new LoadResult(false, "[LinkStaticTFPublisher]: Invalid model pointer! Unable to load component", tfBroadcaster);
        }

        String robotNamespace = "/";
        String frameNamePolicy = "remove_suffix";
        String parentLinkName = null;
        String childLinkName = null;

        if (sdf != null && sdf.hasElement("robotNamespace")) {
            robotNamespace = sdf.getElement("robotNamespace").get();
            if (robotNamespace.length() > 0 && !robotNamespace.endsWith("/")) {
                robotNamespace += "/";
                logger.fine("[LinkStaticTFPublisher]: Automatically added trailing slash to namespace: " + robotNamespace);
            }
            logger.info("[LinkStaticTFPublisher]: Using specified robot namespace: " + robotNamespace);
        } else {
            logger.info("[LinkStaticTFPublisher]: No robotNamespace specified, using default: " + robotNamespace);
        }

        if (sdf != null && sdf.hasElement("frameNamePolicy")) {
            frameNamePolicy = sdf.get("frameNamePolicy");
            if (!"remove_suffix".equals(frameNamePolicy) &&
                !"keep_original".equals(frameNamePolicy) &&
                !"add_prefix".equals(frameNamePolicy)) {
                logger.warning("[LinkStaticTFPublisher]: Invalid frameNamePolicy: " + frameNamePolicy + ", using default policy 'remove_suffix'");
                frameNamePolicy = "remove_suffix";
            } else {
                logger.info("[LinkStaticTFPublisher]: Using frame name policy: " + frameNamePolicy);
            }
        } else {
            logger.info("[LinkStaticTFPublisher]: No frameNamePolicy specified, using default policy: " + frameNamePolicy);
        }

        if (sdf != null && sdf.hasElement("parentLink")) {
            parentLinkName = sdf.get("parentLink");
            logger.fine("[LinkStaticTFPublisher]: Read parent link name: " + parentLinkName);
        } else {
            logger.severe("[LinkStaticTFPublisher]: Missing required element 'parentLink' in SDF configuration");
            logger.severe("[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <parentLink> tag with a valid link name");
            return new LoadResult(false, "[LinkStaticTFPublisher]: Missing required element 'parentLink' in SDF configuration", tfBroadcaster);
        }

        if (sdf != null && sdf.hasElement("childLink")) {
            childLinkName = sdf.get("childLink");
            logger.fine("[LinkStaticTFPublisher]: Read child link name: " + childLinkName);
        } else {
            logger.severe("[LinkStaticTFPublisher]: Missing required element 'childLink' in SDF configuration");
            logger.severe("[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <childLink> tag with a valid link name");
            return new LoadResult(false, "[LinkStaticTFPublisher]: Missing required element 'childLink' in SDF configuration", tfBroadcaster);
        }

        logger.fine("[LinkStaticTFPublisher]: Attempting to get link pointers - Parent: " + parentLinkName + ", Child: " + childLinkName);
        Link parentLink = model.getLink(parentLinkName);
        Link childLink = model.getLink(childLinkName);

        if (parentLink == null) {
            logger.severe("[LinkStaticTFPublisher]: Parent link \"" + parentLinkName + "\" does not exist in model");
            logger.severe("[LinkStaticTFPublisher]: Available links:");
            for (Link link : model.getLinks()) {
                logger.severe("  - " + link.getName());
            }
            return new LoadResult(false, "[LinkStaticTFPublisher]: Parent link \"" + parentLinkName + "\" does not exist in model", tfBroadcaster);
        }

        if (childLink == null) {
            logger.severe("[LinkStaticTFPublisher]: Child link \"" + childLinkName + "\" does not exist in model");
            logger.severe("[LinkStaticTFPublisher]: Available links:");
            for (Link link : model.getLinks()) {
                logger.severe("  - " + link.getName());
            }
            return new LoadResult(false, "[LinkStaticTFPublisher]: Child link \"" + childLinkName + "\" does not exist in model", tfBroadcaster);
        }

        logger.fine("[LinkStaticTFPublisher]: Successfully obtained link pointers - Parent: " + parentLink.getName() + ", Child: " + childLink.getName());

        String parentFrameId = processFrameName(parentLinkName, frameNamePolicy, robotNamespace);
        String childFrameId = processFrameName(childLinkName, frameNamePolicy, robotNamespace);

        logger.fine("[LinkStaticTFPublisher]: Processed frame names - Parent: " + parentFrameId + ", Child: " + childFrameId);

        Pose parentPose = parentLink.worldPose();
        Pose childPose = childLink.worldPose();
        Pose relativePose = subtractPoses(childPose, parentPose);

        logger.fine("[LinkStaticTFPublisher]: Calculated relative pose - Position(x,y,z): (" +
                   relativePose.pos.x + "," + relativePose.pos.y + "," + relativePose.pos.z +
                   "), Rotation(x,y,z,w): (" +
                   relativePose.rot.x + "," + relativePose.rot.y + "," + relativePose.rot.z + "," + relativePose.rot.w + ")");

        // Create transform stamped message
        Map<String, Object> transformStamped = new HashMap<>();
        Map<String, Object> header = new HashMap<>();
        header.put("stamp", "now");
        header.put("frame_id", parentFrameId);
        transformStamped.put("header", header);
        transformStamped.put("child_frame_id", childFrameId);

        Map<String, Object> transform = new HashMap<>();
        Map<String, Object> translation = new HashMap<>();
        translation.put("x", relativePose.pos.x);
        translation.put("y", relativePose.pos.y);
        translation.put("z", relativePose.pos.z);
        transform.put("translation", translation);

        Map<String, Object> rotation = new HashMap<>();
        rotation.put("w", relativePose.rot.w);
        rotation.put("x", relativePose.rot.x);
        rotation.put("y", relativePose.rot.y);
        rotation.put("z", relativePose.rot.z);
        transform.put("rotation", rotation);
        transformStamped.put("transform", transform);

        tfBroadcaster.sendTransform(transformStamped);
        logger.info("[LinkStaticTFPublisher]: Successfully published static TF transform - Parent frame: \"" +
                   parentFrameId + "\", Child frame: \"" + childFrameId + "\"");

        return new LoadResult(true, null, tfBroadcaster);
    }
}
