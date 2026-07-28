package org.real.temp;

import java.awt.Color;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void testDarkBackground() {
        assertEquals("dark", Answer.determineBackgroundLightLevel(new Color(30, 30, 30)));
    }

    @Test
    public void testBrightBackground() {
        assertEquals("bright", Answer.determineBackgroundLightLevel(new Color(250, 250, 250)));
    }

    @Test
    public void testNormalBackground() {
        assertEquals("normal", Answer.determineBackgroundLightLevel(new Color(150, 150, 150)));
    }

    @Test
    public void testHighRedComponent() {
        assertEquals("normal", Answer.determineBackgroundLightLevel(new Color(255, 100, 100)));
    }

    @Test
    public void testLowGreenAndBlue() {
        assertEquals("dark", Answer.determineBackgroundLightLevel(new Color(10, 10, 100)));
    }
}
