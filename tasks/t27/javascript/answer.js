/**
 * Transforms a point cloud to a new reference frame defined by three points.
 *
 * @param {number[][]} pointCloud - The Nx3 array of points in the original reference frame.
 * @param {number[][]} refFramePoints - A list of three points, defining the new reference frame.
 * @returns {number[][]} Transformed point cloud in the new reference frame.
 */
function transformPointCloudToReferenceFrame(pointCloud, refFramePoints) {
    const [A, B, C] = refFramePoints;
    const u = normalize(subtract(B, A));
    const w = normalize(crossProduct(u, subtract(C, A)));
    const v = normalize(crossProduct(w, u));
    const rotationMatrix = [u, v, w];
    const translationVector = rotationMatrix.map(row => -dotProduct(row, A));

    return pointCloud.map(point => add(
        multiplyMatrixVector(rotationMatrix, subtract(point, A)),
        translationVector
    ));
}

function subtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function add(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function dotProduct(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function crossProduct(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function normalize(vector) {
    const norm = Math.sqrt(dotProduct(vector, vector));
    return vector.map(value => value / norm);
}

function multiplyMatrixVector(matrix, vector) {
    return matrix.map(row => dotProduct(row, vector));
}
