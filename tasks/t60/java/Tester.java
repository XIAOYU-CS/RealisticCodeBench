package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testZeroBytes() {
        assertEquals("0B", convertFileSize(0));
    }


    @Test
    public void testBytesLessThan1KB() {
        assertEquals("512B", convertFileSize(512));
    }

    @Test
    public void testExactly1KB() {
        assertEquals("1KB", convertFileSize(1024));
    }

    @Test
    public void test2KB() {
        assertEquals("2KB", convertFileSize(2048));
    }

    @Test
    public void testExactly1MB() {
        assertEquals("1MB", convertFileSize(1048576));
    }

    @Test
    public void test5MB() {
        assertEquals("5MB", convertFileSize(5242880));
    }

    @Test
    public void testExactly1GB() {
        assertEquals("1GB", convertFileSize(1073741824L));
    }
}