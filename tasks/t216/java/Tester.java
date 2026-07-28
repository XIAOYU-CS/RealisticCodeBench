package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testConvertBytesToHumanReadable_KB() {
        assertEquals("1.00 KB", convertBytesToHumanReadable(1024));
        assertEquals("2.00 KB", convertBytesToHumanReadable(2048));
    }

    @Test
    public void testConvertBytesToHumanReadable_MB() {
        assertEquals("1.00 MB", convertBytesToHumanReadable(1048576));
        assertEquals("2.00 MB", convertBytesToHumanReadable(2097152));
    }

    @Test
    public void testConvertBytesToHumanReadable_GB() {
        assertEquals("1.00 GB", convertBytesToHumanReadable(1073741824));
        assertEquals("2.00 GB", convertBytesToHumanReadable(2147483648L));
    }

    @Test
    public void testconvertBytesToHumanReadable_TB() {
        assertEquals("1.00 TB", convertBytesToHumanReadable(1099511627776L));
        assertEquals("2.00 TB", convertBytesToHumanReadable(2199023255552L));
    }

    @Test
    public void testConvertBytesToHumanReadable_BytesAndZero() {
        assertEquals("0 Byte", convertBytesToHumanReadable(0));
        assertEquals("1.00 Bytes", convertBytesToHumanReadable(1));
        assertEquals("1023.00 Bytes", convertBytesToHumanReadable(1023));
    }
}
