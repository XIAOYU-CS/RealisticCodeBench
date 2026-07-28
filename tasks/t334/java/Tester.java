package org.real.temp;

import org.junit.Test;
import java.util.List;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testRgbFormat() {
        byte[] data = new byte[]{(byte) 255, 0, 0, 0, (byte) 255, 0};
        List<Object> result = Answer.opcDataToPixels(data, "rgb", false);

        assertEquals(2, result.size());
        assertArrayEquals(new int[]{255, 0, 0}, (int[]) result.get(0));
        assertArrayEquals(new int[]{0, 255, 0}, (int[]) result.get(1));
    }

    @Test
    public void testRgbaFormat() {
        byte[] data = new byte[]{0, 0, (byte) 255, (byte) 128};
        List<Object> result = Answer.opcDataToPixels(data, "rgba", false);

        assertEquals(1, result.size());
        assertArrayEquals(new int[]{0, 0, 255, 128}, (int[]) result.get(0));
    }

    @Test
    public void testGrbFormat() {
        byte[] data = new byte[]{0, (byte) 255, 0};
        List<Object> result = Answer.opcDataToPixels(data, "grb", false);

        assertEquals(1, result.size());
        assertArrayEquals(new int[]{255, 0, 0}, (int[]) result.get(0));
    }

    @Test
    public void testBgrFormat() {
        byte[] data = new byte[]{0, 0, (byte) 255};
        List<Object> result = Answer.opcDataToPixels(data, "bgr", false);

        assertEquals(1, result.size());
        assertArrayEquals(new int[]{255, 0, 0}, (int[]) result.get(0));
    }

    @Test
    public void testNormalizeParameter() {
        byte[] data = new byte[]{(byte) 255, (byte) 128, 0};
        List<Object> result = Answer.opcDataToPixels(data, "rgb", true);

        assertEquals(1, result.size());
        double[] color = (double[]) result.get(0);

        assertEquals(1.0, color[0], 0.00001);
        assertEquals(128.0 / 255.0, color[1], 0.00001);
        assertEquals(0.0, color[2], 0.00001);
    }

    private void assertArrayEquals(int[] expected, int[] actual) {
        assertEquals(expected.length, actual.length);
        for (int i = 0; i < expected.length; i++) {
            assertEquals(expected[i], actual[i]);
        }
    }
}