package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testHashStyleWithLinePrefix() {
        String inputText = "This is a test comment that should be wrapped to multiple lines";
        String result = Answer.formatCommentWithCustomStyle(inputText, 30, "hash", "[INFO] ");
        String expected = "# [INFO] This is a test\n# [INFO] comment that should\n# [INFO] be wrapped to\n# [INFO] multiple lines";
        assertEquals(expected, result);
    }

    @Test
    public void testSlashStyleSimpleComment() {
        String inputText = "Simple single line comment";
        String result = Answer.formatCommentWithCustomStyle(inputText, 50, "slash", "");
        String expected = "// Simple single line comment";
        assertEquals(expected, result);
    }

    @Test
    public void testBlockStyleMultilineComment() {
        String inputText = "This is a block comment that spans multiple lines and should be properly formatted";
        String result = Answer.formatCommentWithCustomStyle(inputText, 40, "block", "");
        String expected = "/*\n* This is a block comment that spans\n* multiple lines and should be properly\n* formatted\n*/";
        assertEquals(expected, result);
    }

    @Test
    public void testMultilineInputWithWordWrapping() {
        String inputText = "First line of text\nSecond line with more words to wrap";
        String result = Answer.formatCommentWithCustomStyle(inputText, 25, "hash", "");
        String expected = "# First line of text\n# Second line with more\n# words to wrap";
        assertEquals(expected, result);
    }

    @Test
    public void testIrregularWhitespaceCollapsesToSingleSpaces() {
        String inputText = "Alpha   beta\tgamma\n\n delta";
        String result = Answer.formatCommentWithCustomStyle(inputText, 40, "hash", "");
        String expected = "# Alpha beta gamma delta";
        assertEquals(expected, result);
    }
}
