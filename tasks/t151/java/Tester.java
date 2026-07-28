package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testconvertIso8601DurationToReadableFullDuration() {
        assertEquals("1h23m45s678ms", convertIso8601DurationToReadable("PT1H23M45.678S"));
    }

    @Test
    public void testconvertIso8601DurationToReadableOnlySecondsAndMilliseconds() {
        assertEquals("45s500ms", convertIso8601DurationToReadable("PT45.5S"));
    }

    @Test
    public void testconvertIso8601DurationToReadableHoursAndMinutesNoSeconds() {
        assertEquals("2h5m", convertIso8601DurationToReadable("PT2H5M"));
    }

    @Test
    public void testconvertIso8601DurationToReadableOnlySecondsNoMilliseconds() {
        assertEquals("20s", convertIso8601DurationToReadable("PT20S"));
    }

    @Test
    public void testconvertIso8601DurationToReadableInvalidWithoutPtPrefix() {
        assertEquals("", convertIso8601DurationToReadable("1H23M45S"));
    }
}
