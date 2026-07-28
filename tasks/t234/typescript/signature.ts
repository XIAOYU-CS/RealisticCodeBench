type Coordinates = {
    x: number;
    y: number;
};

/**
 * Recursively calculates a point on a Bézier curve using De Casteljau's algorithm.
 *
 * @param t - A value between 0 and 1 representing the interpolation parameter.
 * @param points - An array of control points defining the Bézier curve.
 * @returns The calculated Coordinates at the given parameter t.
 */
function computeBezierCurvePoint(t: number, points: Coordinates[]): Coordinates {}