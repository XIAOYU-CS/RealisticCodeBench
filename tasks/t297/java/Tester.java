package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.junit.Assert.assertThrows;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testNormalWeightBMI() {
        assertEquals(22.86, Answer.calculateBMI(70, 1.75), 0.01);
    }

    @Test
    public void testUnderweightBMI() {
        assertEquals(16.33, Answer.calculateBMI(50, 1.75), 0.01);
    }

    @Test
    public void testOverweightBMI() {
        assertEquals(26.12, Answer.calculateBMI(80, 1.75), 0.01);
    }

    @Test
    public void testObesityBMI() {
        assertEquals(32.65, Answer.calculateBMI(100, 1.75), 0.01);
    }

    @Test
    public void testNegativeWeightThrows() {
        assertThrows(IllegalArgumentException.class, () -> {
            Answer.calculateBMI(-70, 1.75);
        });
    }

    @Test
    public void testZeroHeightThrows() {
        assertThrows(IllegalArgumentException.class, () -> {
            Answer.calculateBMI(70, 0);
        });
    }

    @Test
    public void testNegativeHeightThrows() {
        assertThrows(IllegalArgumentException.class, () -> {
            Answer.calculateBMI(70, -1.75);
        });
    }
}
