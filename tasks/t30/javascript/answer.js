function probabilityOfRedBalls(n, x, y) {
    /**
     * Calculate the probability that n red balls will be drawn when 15 balls are drawn with replacement
     * from a jar containing x red balls and y blue balls.
     *
     * @param {number} n - Number of red balls to be drawn.
     * @param {number} x - Number of red balls in the jar.
     * @param {number} y - Number of blue balls in the jar.
     *
     * @returns {number} - The probability of drawing exactly n red balls.
     */
    const totalDraws = 15;
    const totalBalls = x + y;
    if (n < 0 || n > x || totalDraws - n > y || totalDraws > totalBalls) {
        return 0.0;
    }

    return combination(x, n) * combination(y, totalDraws - n) / combination(totalBalls, totalDraws);
}

function combination(n, r) {
    if (r < 0 || r > n) return 0;
    r = Math.min(r, n - r);
    let result = 1;
    for (let i = 1; i <= r; i++) {
        result = result * (n - r + i) / i;
    }
    return result;
}
