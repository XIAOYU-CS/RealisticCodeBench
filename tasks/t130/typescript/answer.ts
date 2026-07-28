/**
 * Rotate the point cloud around the Y axis by a given angle.
 *
 * @param pointCloud - An Nx3 matrix representing the 3D point cloud.
 * @param rotationAngle - The angle (in radians) to rotate the point cloud.
 * @returns An Nx3 matrix of the rotated point cloud.
 */
function rotatePointCloudAroundYAxis(pointCloud: number[][], rotationAngle: number): number[][] {
    const cos = Math.cos(rotationAngle);
    const sin = Math.sin(rotationAngle);

    return pointCloud.map(([x, y, z]) => [cos * x - sin * z, y, sin * x + cos * z]);
}
