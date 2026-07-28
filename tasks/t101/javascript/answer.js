/**
 * Given a 3x3 affine transformation matrix, return the corresponding scaling factors
 * along the x and y axes.
 *
 * @param {Array<Array<number>>} matrix - A 3x3 affine transformation matrix.
 * @returns {Array<number>} A tuple containing the scale factors [scaleX, scaleY].
 */
function extractScaleFactorsFromMatrix(matrix) {
    // Extracting elements from the matrix
    const a = matrix[0][0];
    const b = matrix[0][1];
    const c = matrix[1][0];
    const d = matrix[1][1];

    // Calculating the scaling factors
    const scaleX = Math.sqrt(a * a + c * c);
    const scaleY = Math.sqrt(b * b + d * d);

    return [scaleX, scaleY];
}
