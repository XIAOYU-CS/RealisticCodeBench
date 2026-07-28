package org.real.temp;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.real.temp.Answer.*;
public class Tester {

    private static final double DELTA = 1e-15;

    @Test
    public void testIdentityQuaternion() {
        double[] quaternion = {1.0, 0.0, 0.0, 0.0};
        double expectedAngle = 0.0;
        assertEquals(expectedAngle, quaternionToAngle(quaternion), DELTA);
    }

    @Test
    public void test180DegreesRotation() {
        double[] quaternion = {0.0, 0.0, 1.0, 0.0};
        double expectedAngle = Math.PI;
        assertEquals(expectedAngle, quaternionToAngle(quaternion), DELTA);
    }

    @Test
    public void test360DegreesRotation() {
        double[] quaternion = {1.0, 0.0, 0.0, 0.0};
        double expectedAngle = 0.0;
        assertEquals(expectedAngle, quaternionToAngle(quaternion), DELTA);
    }

    @Test
    public void testNonUnitQuaternion() {
        double[] quaternion = {0.5, 0.5, 0.5, 0.5};
        double norm = Math.sqrt(Arrays.stream(quaternion).map(x -> x * x).sum());
        double[] normalizedQuaternion = Arrays.stream(quaternion).map(x -> x / norm).toArray();
        double expectedAngle = 2 * Math.acos(normalizedQuaternion[0]);
        assertEquals(expectedAngle, quaternionToAngle(normalizedQuaternion), DELTA);
    }

    @Test
    public void testInvalidQuaternion() {
        assertThrows(IllegalArgumentException.class, () -> {
            quaternionToAngle(new double[]{1.0, 0.0, 0.0});
        });
    }
}