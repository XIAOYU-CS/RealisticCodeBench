import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class Tester {
    @Test
    public void convertsSimpleStringToBase64() {
        assertEquals("SGVsbG8sIFdvcmxkIQ==", Answer.convertToBase64("Hello, World!"));
    }

    @Test
    public void convertsEmptyStringToBase64() {
        assertEquals("", Answer.convertToBase64(""));
    }

    @Test
    public void convertsStringWithSpacesToBase64() {
        assertEquals("VGVzdCBTdHJpbmcgd2l0aCBTcGFjZXM=", Answer.convertToBase64("Test String with Spaces"));
    }

    @Test
    public void convertsStringWithSpecialCharactersToBase64() {
        assertEquals("U3BlY2lhbCBjaGFyYWN0ZXJzOiBAIyYqKCk=", Answer.convertToBase64("Special characters: @#&*()"));
    }

    @Test
    public void convertsNonAsciiStringToBase64() {
        assertEquals("5L2g5aW977yM5LiW55WM77yB", Answer.convertToBase64("\u4f60\u597d\uff0c\u4e16\u754c\uff01"));
    }

    @Test
    public void convertsLongStringToBase64() {
        String longString = "This is a very long string that exceeds normal lengths for testing purposes.";
        assertEquals(
                "VGhpcyBpcyBhIHZlcnkgbG9uZyBzdHJpbmcgdGhhdCBleGNlZWRzIG5vcm1hbCBsZW5ndGhzIGZvciB0ZXN0aW5nIHB1cnBvc2VzLg==",
                Answer.convertToBase64(longString));
    }
}
