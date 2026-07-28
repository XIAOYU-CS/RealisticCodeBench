package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void testIntegralZeroToOne() {
        assertEquals(1.0 / 3.0, Answer.simpsonsRule(0.0, 1.0, 10), 0.01);
    }

    @Test
    public void testIntegralZeroToTwo() {
        assertEquals(8.0 / 3.0, Answer.simpsonsRule(0.0, 2.0, 10), 0.01);
    }

    @Test
    public void testIntegralNegativeOneToZero() {
        assertEquals(1.0 / 3.0, Answer.simpsonsRule(-1.0, 0.0, 10), 0.01);
    }

    @Test
    public void testLargeInterval() {
        assertEquals(1000.0 / 3.0, Answer.simpsonsRule(0.0, 10.0, 20), 0.01);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidSubintervalCount() {
        Answer.simpsonsRule(0.0, 1.0, 9);
    }
}
