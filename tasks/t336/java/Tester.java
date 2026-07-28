package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testNonStringInput() {
        assertFalse(isValidPathFormat(null));
    }

    @Test
    public void testInvalidCharacters() {
        assertFalse(isValidPathFormat("path?with?invalid?chars"));
        assertFalse(isValidPathFormat("invalid*path"));
        assertFalse(isValidPathFormat("\"quoted path\""));
    }

    @Test
    public void testAbsolutePaths() {
        assertTrue(isValidPathFormat("/absolute/path"));
        assertFalse(isValidPathFormat("C:\\absolute\\path"));
        assertTrue(isValidPathFormat("D:/absolute/path"));
    }

    @Test
    public void testRelativePaths() {
        assertTrue(isValidPathFormat("relative/path"));
        assertTrue(isValidPathFormat("another.relative/path"));
        assertTrue(isValidPathFormat("a/b/c"));
        assertFalse(isValidPathFormat("a\\b\\c"));
    }

    @Test
    public void testSinglePartPaths() {
        assertFalse(isValidPathFormat("singlepart"));
        assertFalse(isValidPathFormat("filename.txt"));
        assertFalse(isValidPathFormat("."));
        assertFalse(isValidPathFormat(".."));
    }
}
