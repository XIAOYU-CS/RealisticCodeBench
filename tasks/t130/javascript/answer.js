function rotatePointCloudAroundYAxis(pointCloud, rotationAngle) {
    /**
     * Rotate the point cloud around the Y axis by a given angle.
     *
     * @param {Array} pointCloud - A N x 3 array representing the 3D point cloud.
     * @param {number} rotationAngle - The angle (in radians) to rotate the point cloud.
     * @returns {Array} - A N x 3 array of the rotated point cloud.
     */

    const cos = Math.cos(rotationAngle);
    const sin = Math.sin(rotationAngle);

    // Rotate the point cloud
    const rotatedPointCloud = pointCloud.map(point => {
        const x = point[0];
        const y = point[1];
        const z = point[2];

        const rotatedX = cos * x - sin * z;
        const rotatedY = y; // Y remains unchanged
        const rotatedZ = sin * x + cos * z;

        return [rotatedX, rotatedY, rotatedZ];
    });

    return rotatedPointCloud;
}
