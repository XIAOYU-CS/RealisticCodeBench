package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testPrivateIP() {
        assertTrue(isCompliantIP("192.168.1.1"));
    }

    @Test
    public void testPublicIP() {
        assertFalse(isCompliantIP("8.8.8.8"));
    }

    @Test
    public void testInvalidIP() {
        assertFalse(isCompliantIP("999.999.999.999"));
    }


    @Test
    public void testTenNetworkPrivateIP() {
        assertTrue(isCompliantIP("10.0.0.1"));
        assertTrue(isCompliantIP("10.255.255.254"));
    }

    @Test
    public void test172PrivateIPRange() {
        assertTrue(isCompliantIP("172.16.0.1"));
        assertTrue(isCompliantIP("172.31.255.255"));
        assertFalse(isCompliantIP("172.15.255.255"));
        assertFalse(isCompliantIP("172.32.0.0"));
    }

    @Test
    public void testSpecialNonCompliantIPs() {
        assertFalse(isCompliantIP("127.0.0.1"));
        assertFalse(isCompliantIP("169.254.1.1"));
    }

    @Test
    public void testMalformedIPStrings() {
        assertFalse(isCompliantIP("192.168.1"));
        assertFalse(isCompliantIP("192.168.1.1.1"));
        assertFalse(isCompliantIP("192.168.-1.1"));
        assertFalse(isCompliantIP("192.168.01.1"));
        assertFalse(isCompliantIP(""));
        assertFalse(isCompliantIP("192.168.1."));
        assertFalse(isCompliantIP("abc.def.ghi.jkl"));
    }
}
