package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import java.util.Arrays;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicFunctionality() {
        assertEquals(Arrays.asList(4, 4, 4, 4),
                     Answer.performPolynomialDecryption(4, 5, Arrays.asList(1, 2, 3, 4), Arrays.asList(5, 6, 7, 8)));
    }

    @Test
    public void testZeroSecretKey() {
        assertEquals(Arrays.asList(6, 6, 6),
                     Answer.performPolynomialDecryption(3, 7, Arrays.asList(0, 0, 0), Arrays.asList(6, 13, 20)));
    }

    @Test
    public void testZeroCiphertext() {
        assertEquals(Arrays.asList(8, 7, 6),
                     Answer.performPolynomialDecryption(3, 9, Arrays.asList(1, 2, 3), Arrays.asList(0, 0, 0)));
    }

    @Test
    public void testLargeValues() {
        assertEquals(Arrays.asList(500, 500),
                     Answer.performPolynomialDecryption(2, 1000, Arrays.asList(500, 500), Arrays.asList(1000, 1000)));
    }

    @Test
    public void testEmptyPolynomial() {
        assertEquals(Arrays.asList(),
                     Answer.performPolynomialDecryption(0, 7, Arrays.asList(), Arrays.asList()));
    }
}
