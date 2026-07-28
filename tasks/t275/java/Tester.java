package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {
    
    @Test
    public void testInvertFlagBitsToHexCase1() {
        assertEquals("FFFFFFE0", invertFlagBitsToHex(0x0000001F));
    }

    @Test
    public void testInvertFlagBitsToHexCase2() {
        assertEquals("FFFFFFEA", invertFlagBitsToHex(0x00000015));
    }

    @Test
    public void testInvertFlagBitsToHexCase3() {
        assertEquals("0", invertFlagBitsToHex(0xFFFFFFFF));
    }

    @Test
    public void testInvertFlagBitsToHexCase4() {
        assertEquals("EDCBA987", invertFlagBitsToHex(0x12345678));
    }

    @Test
    public void testInvertFlagBitsToHexCase5() {
        assertEquals("FFFFFFFE", invertFlagBitsToHex(0x00000001));
    }

    @Test
    public void testInvertFlagBitsToHexCase6() {
        assertEquals("FFFFFFFC", invertFlagBitsToHex(0x00000003));
    }

    @Test
    public void testInvertFlagBitsToHexCase7() {
        assertEquals("FFFFFFF7", invertFlagBitsToHex(0x00000008));
    }

    @Test
    public void testInvertFlagBitsToHexCase8() {
        assertEquals("543210FE", invertFlagBitsToHex(0xABCDEF01));
    }
}
