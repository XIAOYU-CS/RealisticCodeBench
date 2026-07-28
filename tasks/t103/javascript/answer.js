function extractRotationAngleFromMatrix(matrix) {
    /**
     * Given an affine transformation matrix, return the corresponding rotation angle in radians.
     *
     * @param {Array} matrix - A 2D affine transformation matrix.
     * @returns {number} The rotation angle in radians, extracted from the affine matrix.
     */

    if (!Array.isArray(matrix) || matrix.length !== 3 || matrix.some(row => !Array.isArray(row) || row.length !== 3)) {
        throw new Error("Input must be a 3x3 affine transformation matrix.");
    }

    return Math.atan2(matrix[1][0], matrix[0][0]);
}
