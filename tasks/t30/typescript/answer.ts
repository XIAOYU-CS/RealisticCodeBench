function probabilityOfRedBalls(n: number, x: number, y: number): number {
    /**
     * Calculate the probability that n red balls will be drawn when 15 balls are drawn
     * from a jar containing x red balls and y blue balls.
     *
     * @param n - Number of red balls to be drawn.
     * @param x - Number of red balls in the jar.
     * @param y - Number of blue balls in the jar.
     * @returns The probability of drawing exactly n red balls.
     */
    const totalDraws = 15;
    const totalBalls = x + y;
    if (n < 0 || n > x || totalDraws - n > y || totalDraws > totalBalls) {
        return 0.0;
    }

    const denominator = combination(totalBalls, totalDraws);
    return denominator === 0 ? 0.0 : combination(x, n) * combination(y, totalDraws - n) / denominator;
}

function combination(n: number, r: number): number {
    if (r < 0 || r > n) return 0;
    r = Math.min(r, n - r);
    let result = 1;
    for (let i = 1; i <= r; i++) {
        result = result * (n - r + i) / i;
    }
    return result;
}
