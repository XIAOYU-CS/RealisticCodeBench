package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.*;

public class Tester {
    @Test
    public void testLanczosBasic() {
        LanczosResult result = lanczos(2, new QuadratureRule(new double[]{0.0, 0.5, 1.0}, new double[]{0.333, 0.333, 0.334}));
        assertEquals(2, result.alpha.length);
        assertEquals(1, result.beta.length);
        assertEquals(2, result.gamma.length);
    }

    @Test
    public void testLanczosWeightsNonuniform() {
        LanczosResult result = lanczos(3, new QuadratureRule(new double[]{0.0, 0.5, 1.0}, new double[]{0.1, 0.4, 0.5}));
        assertEquals(3, result.alpha.length);
        assertEquals(2, result.beta.length);
        assertEquals(3, result.gamma.length);
        for (double value : result.gamma) {
            assertTrue(value > 0);
        }
    }

    @Test
    public void testLanczosSingleNode() {
        LanczosResult result = lanczos(1, new QuadratureRule(new double[]{0.5}, new double[]{1.0}));
        assertEquals(1, result.alpha.length);
        assertEquals(0, result.beta.length);
        assertEquals(1, result.gamma.length);
        assertTrue(result.gamma[0] > 0);
    }

    @Test
    public void testLanczosZero() {
        LanczosResult result = lanczos(0, new QuadratureRule(new double[]{0.0, 0.5, 1.0}, new double[]{0.333, 0.333, 0.334}));
        assertEquals(0, result.alpha.length);
        assertEquals(0, result.beta.length);
        assertEquals(0, result.gamma.length);
    }

    @Test
    public void testLanczosDuplicateNodes() {
        LanczosResult result = lanczos(2, new QuadratureRule(new double[]{0.0, 0.0, 1.0}, new double[]{0.25, 0.25, 0.5}));
        assertEquals(2, result.alpha.length);
        assertEquals(1, result.beta.length);
        assertEquals(2, result.gamma.length);
        for (double value : result.gamma) {
            assertTrue(value >= 0);
        }
    }
}
