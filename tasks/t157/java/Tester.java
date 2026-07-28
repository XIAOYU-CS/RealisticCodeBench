package org.real.temp;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.*;

import org.junit.Test;

public class Tester {

    @Test
    public void testValidPngBase64() {
        String validPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        assertTrue(isBase64EncodedImageData(validPng));
    }

    @Test
    public void testValidJpegBase64() {
        String validJpeg = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAA";
        assertTrue(isBase64EncodedImageData(validJpeg));
    }

    @Test
    public void testInvalidFormat() {
        String invalidFormat = "data:text/plain;base64,SGVsbG8gd29ybGQ=";
        assertFalse(isBase64EncodedImageData(invalidFormat));
    }

    @Test
    public void testInvalidBase64Characters() {
        String invalidBase64 = "data:image/png;base64,invalidBase64String@#%";
        assertFalse(isBase64EncodedImageData(invalidBase64));
    }

    @Test
    public void testEmptyString() {
        assertFalse(isBase64EncodedImageData(""));
    }

    @Test
    public void testNullInput() {
        assertFalse(isBase64EncodedImageData(null));
    }
}