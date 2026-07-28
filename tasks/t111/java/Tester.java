package org.real.temp;

import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.real.temp.Answer.*;

public class Tester {

    private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();

    @Before
    public void setUp() {
        System.setOut(new PrintStream(outContent));
        clearIpconfigOutputForTest();
    }

    @Test
    public void testLocalIpFound() {
        setIpconfigOutputForTest("192.168.1.10\n");
        String result = getWindowsLocalIp();
        assertEquals("192.168.1.10", result);
    }

    @Test
    public void testNoLocalIpFound() {
        setIpconfigOutputForTest("10.0.0.5\n");
        String result = getWindowsLocalIp();
        assertNull(result);
    }

    @Test
    public void testMultipleIpsFound() {
        setIpconfigOutputForTest("10.0.0.5\n192.168.1.10\n");
        String result = getWindowsLocalIp();
        assertEquals("192.168.1.10", result);
    }

    @Test
    public void testInvalidCommand() {
        setIpconfigRunnerForTest(() -> {
            throw new IOException("ipconfig failed");
        });
        String result = getWindowsLocalIp();
        assertNull(result);
    }

    @Test
    public void testUnexpectedError() {
        setIpconfigRunnerForTest(() -> {
            throw new RuntimeException("Unexpected error");
        });
        String result = getWindowsLocalIp();
        assertNull(result);
    }

}
