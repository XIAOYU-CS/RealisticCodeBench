package org.real.temp;

import org.junit.Test;
import java.util.Date;
import java.util.TimeZone;
import static org.junit.Assert.assertEquals;
import org.real.temp.Answer.*;

public class Tester {
    static {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }

    @Test
    public void testCalculateGoodFriday2024() {
        Date result = Answer.calculateGoodFridayDate(2024);
        assertEquals("Fri Mar 29 00:00:00 UTC 2024", result.toString());
    }

    @Test
    public void testCalculateGoodFriday2021() {
        Date result = Answer.calculateGoodFridayDate(2021);
        assertEquals("Fri Apr 02 00:00:00 UTC 2021", result.toString());
    }

    @Test
    public void testCalculateGoodFriday2000() {
        Date result = Answer.calculateGoodFridayDate(2000);
        assertEquals("Fri Apr 21 00:00:00 UTC 2000", result.toString());
    }

    @Test
    public void testCalculateGoodFriday2019() {
        Date result = Answer.calculateGoodFridayDate(2019);
        assertEquals("Fri Apr 19 00:00:00 UTC 2019", result.toString());
    }

    @Test
    public void testCalculateGoodFriday1999() {
        Date result = Answer.calculateGoodFridayDate(1999);
        assertEquals("Fri Apr 02 00:00:00 UTC 1999", result.toString());
    }

    @Test
    public void testCalculateGoodFriday1981() {
        Date result = Answer.calculateGoodFridayDate(1981);
        assertEquals("Fri Apr 17 00:00:00 UTC 1981", result.toString());
    }

    @Test
    public void testCalculateGoodFriday1954() {
        Date result = Answer.calculateGoodFridayDate(1954);
        assertEquals("Fri Apr 16 00:00:00 UTC 1954", result.toString());
    }
}
