package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.convertBinaryStringToUint8Array;

public class Tester {
    @Test
    public void convertsFullByteBinaryString() {
        assertArrayEquals(new int[]{202}, convertBinaryStringToUint8Array("11001010"));
    }

    @Test
    public void convertsMultipleFullBytes() {
        assertArrayEquals(new int[]{202, 240}, convertBinaryStringToUint8Array("1100101011110000"));
    }

    @Test
    public void handlesEmptyBinaryString() {
        assertArrayEquals(new int[]{}, convertBinaryStringToUint8Array(""));
    }

    @Test
    public void preservesLeadingZeros() {
        assertArrayEquals(new int[]{45}, convertBinaryStringToUint8Array("00101101"));
    }

    @Test
    public void handlesShortFinalChunkAsZero() {
        assertArrayEquals(new int[]{202, 0}, convertBinaryStringToUint8Array("11001010000"));
    }
}
