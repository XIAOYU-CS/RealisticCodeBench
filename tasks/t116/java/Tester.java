package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testBasicCase() {
        assertEquals("fpgbc", convertToShortFormat("f1_p1_g1_b1_c1"));
    }


    @Test
    public void testMultipleSegments() {
        assertEquals("abc", convertToShortFormat("a2_b3_c4"));
    }


    @Test
    public void testNonAlphaNumeric() {
        assertEquals("hwt", convertToShortFormat("hello_world_test"));
    }

    @Test
    public void testSingleSegment() {
        assertEquals("s", convertToShortFormat("single"));
    }

    @Test
    public void testSegmentsStartingWithSymbolsAndDigits() {
        assertEquals("$#9", convertToShortFormat("$cost_#tag_9lives"));
    }
    
}
