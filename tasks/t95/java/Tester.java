package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testCase1() {
        int[] rect1 = {0, 0, 2, 2};
        int[] rect2 = {1, 1, 3, 3};
        assertTrue("Rectangles should intersect vertically", intersectVertically(rect1, rect2));
    }

    @Test
    public void testCase2() {
        int[] rect1 = {-1, -1, 1, 1};
        int[] rect2 = {0, 0, 2, 2};
        assertTrue("Rectangles should intersect vertically", intersectVertically(rect1, rect2));
    }

    @Test
    public void testCase3() {
        int[] rect1 = {0, 1, 2, 4};
        int[] rect2 = {1, 0, 3, 2};
        assertTrue("Rectangles should intersect vertically", intersectVertically(rect1, rect2));
    }

    @Test
    public void testCase4() {
        int[] rect1 = {0, 0, 2, 2};
        int[] rect2 = {0, 0, 2, 2};
        assertTrue("Rectangles should intersect vertically", intersectVertically(rect1, rect2));
    }

    @Test
    public void testCase5() {
        int[] rect1 = {0, 0, 4, 4};
        int[] rect2 = {1, 1, 2, 2};
        assertTrue("Rectangles should intersect vertically", intersectVertically(rect1, rect2));
    }
}