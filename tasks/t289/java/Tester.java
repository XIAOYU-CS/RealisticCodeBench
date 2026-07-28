package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.getLastPartOfFilepath;

public class Tester {
    @Test
    public void testUnixStylePath() {
        assertEquals("file.txt", getLastPartOfFilepath("/home/user/documents/file.txt"));
    }

    @Test
    public void testWindowsStylePath() {
        assertEquals("file.txt", getLastPartOfFilepath("C:\\Users\\JohnDoe\\Documents\\file.txt"));
    }

    @Test
    public void testPathWithoutSeparators() {
        assertEquals("file.txt", getLastPartOfFilepath("file.txt"));
    }

    @Test
    public void testPathEndingWithSeparator() {
        assertEquals("", getLastPartOfFilepath("/home/user/documents/"));
    }

    @Test
    public void testMixedSeparators() {
        assertEquals("file.txt", getLastPartOfFilepath("C:/Users\\JohnDoe/Documents/file.txt"));
    }
}
