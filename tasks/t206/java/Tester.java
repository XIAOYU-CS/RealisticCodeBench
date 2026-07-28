package org.real.temp;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import static org.real.temp.Answer.*;

public class Tester {

    private static FormatOptions options(Integer decimals, String sizeType) {
        return new FormatOptions(decimals, sizeType);
    }

    @Test
    public void testZeroBytes() {
        assertEquals("0 Byte", formatByteSizeToUnitString(0, options(null, null)));
    }

    @Test
    public void testBytesBelowKilobyteBoundary() {
        assertEquals("1023 Bytes", formatByteSizeToUnitString(1023, options(null, null)));
    }

    @Test
    public void testDefaultNormalKilobytes() {
        assertEquals("2 KB", formatByteSizeToUnitString(2048, options(null, null)));
    }

    @Test
    public void testAccurateKilobytes() {
        assertEquals("2 KiB", formatByteSizeToUnitString(2048, options(null, "accurate")));
    }

    @Test
    public void testDefaultNormalMegabytes() {
        assertEquals("5 MB", formatByteSizeToUnitString(5242880, options(null, null)));
    }

    @Test
    public void testAccurateMegabytesWithDecimals() {
        assertEquals("5.00 MiB", formatByteSizeToUnitString(5242880, options(2, "accurate")));
    }
}
