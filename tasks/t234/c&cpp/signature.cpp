struct Coordinates {
    double x;
    double y;
};
/**
 * @brief Computes a point on a Bézier curve at parameter @p t using De Casteljau's algorithm.
 *
 * This function implements De Casteljau's recursive algorithm to evaluate the Bézier curve
 * defined by the given control points at interpolation parameter @p t ∈ [0, 1].
 *
 * - When @p t = 0, the result is the first control point.
 * - When @p t = 1, the result is the last control point.
 * - For @p t ∈ (0, 1), the result lies on the curve between the endpoints.
 *
 * @param[in] t      Interpolation parameter in the range [0, 1].
 * @param[in] points A non-empty vector of control points defining the Bézier curve.
 * @return The coordinates of the point on the Bézier curve corresponding to @p t.
 *
 */
Coordinates compute_bezier_curve_point(double t, const std::vector<Coordinates>& points);