
function LinkStaticTFPublisher() {
    this.tfBroadcaster = null;
    this.model = null;
}

LinkStaticTFPublisher.prototype.load = function(model, sdf) {
    if (!model) {
        console.error("[LinkStaticTFPublisher]: Invalid model pointer! Unable to load component");
        return;
    }

    this.model = model;
    const privateNh = typeof ROS !== 'undefined' ? new ROS.NodeHandle("~") : null; // Create private node handle for parameter access

    let parentLinkName;
    let childLinkName;
    let robotNamespace;
    let frameNamePolicy = "remove_suffix"; // Frame name handling policies: remove_suffix, keep_original, add_prefix

    robotNamespace = "/";
    if (sdf?.hasElement("robotNamespace")) {
        robotNamespace = sdf.getElement("robotNamespace").get();
        if (robotNamespace.length > 0 && robotNamespace[robotNamespace.length - 1] !== '/') {
            robotNamespace += "/";
            console.debug(`[LinkStaticTFPublisher]: Automatically added trailing slash to namespace: ${robotNamespace}`);
        }
        console.info(`[LinkStaticTFPublisher]: Using specified robot namespace: ${robotNamespace}`);
    } else {
        console.info(`[LinkStaticTFPublisher]: No robotNamespace specified, using default: ${robotNamespace}`);
    }

    if (sdf?.hasElement("frameNamePolicy")) {
        frameNamePolicy = sdf.get("frameNamePolicy");
        if (frameNamePolicy !== "remove_suffix" &&
            frameNamePolicy !== "keep_original" &&
            frameNamePolicy !== "add_prefix") {
            console.warn(`[LinkStaticTFPublisher]: Invalid frameNamePolicy: ${frameNamePolicy}, using default policy 'remove_suffix'`);
            frameNamePolicy = "remove_suffix";
        } else {
            console.info(`[LinkStaticTFPublisher]: Using frame name policy: ${frameNamePolicy}`);
        }
    } else {
        console.info(`[LinkStaticTFPublisher]: No frameNamePolicy specified, using default policy: ${frameNamePolicy}`);
    }

    if (sdf?.hasElement("parentLink")) {
        parentLinkName = sdf.get("parentLink");
        console.debug(`[LinkStaticTFPublisher]: Read parent link name: ${parentLinkName}`);
    } else {
        console.error("[LinkStaticTFPublisher]: Missing required element 'parentLink' in SDF configuration");
        console.error("[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <parentLink> tag with a valid link name");
        return;
    }

    if (sdf?.hasElement("childLink")) {
        childLinkName = sdf.get("childLink");
        console.debug(`[LinkStaticTFPublisher]: Read child link name: ${childLinkName}`);
    } else {
        console.error("[LinkStaticTFPublisher]: Missing required element 'childLink' in SDF configuration");
        console.error("[LinkStaticTFPublisher]: Please check SDF file and ensure it contains a <childLink> tag with a valid link name");
        return;
    }

    console.debug(`[LinkStaticTFPublisher]: Attempting to get link pointers - Parent: ${parentLinkName}, Child: ${childLinkName}`);
    const parentLink = model.getLink(parentLinkName);
    const childLink = model.getLink(childLinkName);

    if (!parentLink) {
        console.error(`[LinkStaticTFPublisher]: Parent link "${parentLinkName}" does not exist in model`);
        console.error("[LinkStaticTFPublisher]: Available links:");
        const links = model.getLinks();
        for (const link of links) {
            console.error(`  - ${link.getName()}`);
        }
        return;
    }

    if (!childLink) {
        console.error(`[LinkStaticTFPublisher]: Child link "${childLinkName}" does not exist in model`);
        console.error("[LinkStaticTFPublisher]: Available links:");
        const links = model.getLinks();
        for (const link of links) {
            console.error(`  - ${link.getName()}`);
        }
        return;
    }

    console.debug(`[LinkStaticTFPublisher]: Successfully obtained link pointers - Parent: ${parentLink.getName()}, Child: ${childLink.getName()}`);

    const parentFrameId = processFrameName(parentLinkName, frameNamePolicy, robotNamespace);
    const childFrameId = processFrameName(childLinkName, frameNamePolicy, robotNamespace);

    console.debug(`[LinkStaticTFPublisher]: Processed frame names - Parent: ${parentFrameId}, Child: ${childFrameId}`);

    const parentPose = parentLink.worldPose();
    const childPose = childLink.worldPose();
    const relativePose = subtractPoses(childPose, parentPose);

    console.debug(`[LinkStaticTFPublisher]: Calculated relative pose - Position(x,y,z): (${relativePose.pos.x},${relativePose.pos.y},${relativePose.pos.z}), Rotation(x,y,z,w): (${relativePose.rot.x},${relativePose.rot.y},${relativePose.rot.z},${relativePose.rot.w})`);

    if (typeof geometry_msgs === 'undefined' || typeof ros === 'undefined') {
        console.error("[LinkStaticTFPublisher]: ROS message types or ros object not available");
        return;
    }
    const transformStamped = new geometry_msgs.TransformStamped();
    transformStamped.header.stamp = ros.Time.now();
    transformStamped.header.frame_id = parentFrameId;
    transformStamped.child_frame_id = childFrameId;

    transformStamped.transform.translation.x = relativePose.pos.x;
    transformStamped.transform.translation.y = relativePose.pos.y;
    transformStamped.transform.translation.z = relativePose.pos.z;
    transformStamped.transform.rotation.w = relativePose.rot.w;
    transformStamped.transform.rotation.x = relativePose.rot.x;
    transformStamped.transform.rotation.y = relativePose.rot.y;
    transformStamped.transform.rotation.z = relativePose.rot.z;

    if (this.tfBroadcaster) {
        this.tfBroadcaster.sendTransform(transformStamped);
        console.info(`[LinkStaticTFPublisher]: Successfully published static TF transform - Parent frame: "${parentFrameId}", Child frame: "${childFrameId}"`);
    } else {
        console.error("[LinkStaticTFPublisher]: TF Broadcaster not initialized");
    }
};

function processFrameName(linkName, policy, ns) {
    let frameName = linkName;

    if (policy === "remove_suffix") {
        const pos = frameName.indexOf("_link");
        if (pos !== -1) {
            frameName = frameName.substring(0, pos); // Remove "_link" (5 characters)
            console.debug(`[LinkStaticTFPublisher]: Removed _link suffix - Original: ${linkName}, Processed: ${frameName}`);
        } else {
            console.debug(`[LinkStaticTFPublisher]: Link name does not contain _link suffix, keeping original: ${linkName}`);
        }
    } else if (policy === "add_prefix") {
        frameName = "frame_" + frameName;
        console.debug(`[LinkStaticTFPublisher]: Added frame_ prefix - Original: ${linkName}, Processed: ${frameName}`);
    }

    return ns + frameName;
}

function subtractPoses(pose1, pose2) {
    const pos = {
        x: pose1.pos.x - pose2.pos.x,
        y: pose1.pos.y - pose2.pos.y,
        z: pose1.pos.z - pose2.pos.z
    };

    const invRot2 = invertQuaternion(pose2.rot);
    const rot = multiplyQuaternions(invRot2, pose1.rot);

    return { pos, rot };
}

function invertQuaternion(quat) {
    return {
        x: -quat.x,
        y: -quat.y,
        z: -quat.z,
        w: quat.w
    };
}

function multiplyQuaternions(a, b) {
    return {
        w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
        x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
        y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
        z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w
    };
}