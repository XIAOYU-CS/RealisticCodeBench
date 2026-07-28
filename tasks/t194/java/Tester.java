package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testCalculateDiscount1() {
        assertEquals(25.00, calculateDiscountPercentage(100, 75), 0.01);
    }

    @Test
    public void testCalculateDiscount2() {
        assertEquals(0.00, calculateDiscountPercentage(50, 50), 0.01);
    }

    @Test
    public void testCalculateDiscount3() {
        assertEquals(100.00, calculateDiscountPercentage(100, 0), 0.01);
    }

    @Test
    public void testCalculateDiscount4() {
        assertEquals(50.00, calculateDiscountPercentage(200, 100), 0.01);
    }

    @Test
    public void testRoundingOverpaymentAndInvalidPrices() {
        assertEquals(33.33, calculateDiscountPercentage(3, 2), 0.01);
        assertEquals(-20.00, calculateDiscountPercentage(100, 120), 0.01);
        try {
            calculateDiscountPercentage(0, 1);
            fail("Expected original price validation to throw");
        } catch (IllegalArgumentException expected) {
            // expected
        }
        try {
            calculateDiscountPercentage(10, -1);
            fail("Expected actual price validation to throw");
        } catch (IllegalArgumentException expected) {
            // expected
        }
    }
}
