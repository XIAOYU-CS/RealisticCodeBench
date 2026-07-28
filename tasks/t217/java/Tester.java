package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testExtractFileExtension_standardFile() {
        assertEquals("txt", extractFileExtension("example.txt"));
    }

    @Test
    public void testExtractFileExtension_noExtension() {
        assertEquals("", extractFileExtension("example"));
    }

    @Test
    public void testExtractFileExtension_multipleDots() {
        assertEquals("jpg", extractFileExtension("example.with.many.dots.jpg"));
    }

    @Test
    public void testExtractFileExtension_trailingDot() {
        assertEquals("", extractFileExtension("example."));
    }

    @Test
    public void testExtractFileExtension_caseSensitivity() {
        assertEquals("JPG", extractFileExtension("example.JPG"));
    }
}