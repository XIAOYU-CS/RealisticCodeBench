package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.real.temp.Answer.*;
public class Tester {

    private static long combination(int n, int r) {
        if (r < 0 || r > n) return 0;
        r = Math.min(r, n - r);
        long result = 1;
        for (int i = 0; i < r; i++) {
            result = result * (n - i) / (i + 1);
        }
        return result;
    }

    @Test
    public void testValidProbabilityCalculation() {
        double result = probabilityOfRedBalls(5, 20, 15);
        assertTrue("Result should be a number between 0 and 1",
                  result >= 0.0 && result <= 1.0);
        assertTrue("Result should be a valid number",
                  !Double.isNaN(result) && !Double.isInfinite(result));
    }

    @Test
    public void testImpossibleCaseReturnsZero() {
        double result = probabilityOfRedBalls(10, 5, 10);
        assertEquals("Should return 0.0 when impossible", 0.0, result, 0.0001);
    }

    @Test
    public void testBoundaryCaseAllRedBalls() {
        double result = probabilityOfRedBalls(15, 15, 10);
        double expected = (double)(combination(15, 15) * combination(10, 0)) / combination(25, 15);
        assertEquals("Should calculate probability correctly for all red balls", expected, result, 0.0001);
    }

    @Test
    public void testZeroRedBallsRequested() {

        double result = probabilityOfRedBalls(0, 8, 12);
        assertEquals("Should return 0.0 when impossible to draw required blue balls", 0.0, result, 0.0001);
    }

    @Test
    public void testDrawMoreThanTotalBalls() {
        double result = probabilityOfRedBalls(5, 5, 8);
        assertEquals("Should return 0.0 when trying to draw more balls than available", 0.0, result, 0.0001);
    }
}
