package org.real.temp;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicHtmlSplitting() {
        String html = "<p>Hello</p>World<ul><li>Item1</li></ul>";
        List<String> result = Answer.splitHtmlContent(html, null, false);
        List<String> expected = Arrays.asList("<p>Hello</p>", "World", "<ul><li>Item1</li></ul>");
        assertEquals(expected, result);
    }

    @Test
    public void testCustomTargetTags() {
        String html = "<div>Content</div><span>Text</span>End";
        List<String> result = Answer.splitHtmlContent(html, Arrays.asList("div", "span"), false);
        List<String> expected = Arrays.asList("<div>Content</div>", "<span>Text</span>", "End");
        assertEquals(expected, result);
    }

    @Test
    public void testPreserveWhitespaceMode() {
        String html = "  Start  <p>  Content  </p>  End  ";
        List<String> result = Answer.splitHtmlContent(html, null, true);
        List<String> expected = Arrays.asList("  Start  ", "<p>  Content  </p>", "  End  ");
        assertEquals(expected, result);
    }

    @Test
    public void testStripWhitespaceMode() {
        String html = "  Start  <p>  Content  </p>  End  ";
        List<String> result = Answer.splitHtmlContent(html, null, false);
        List<String> expected = Arrays.asList("Start", "<p>  Content  </p>", "End");
        assertEquals(expected, result);
    }

    @Test
    public void testTagsWithAttributes() {
        String html = "Text<div class=\"container\" id=\"main\">Content</div>End";
        List<String> result = Answer.splitHtmlContent(html, Arrays.asList("div"), false);
        List<String> expected = Arrays.asList("Text", "<div class=\"container\" id=\"main\">Content</div>", "End");
        assertEquals(expected, result);
    }

    @Test
    public void testErrorHandling() {
        try {
            Answer.splitHtmlContent("<p>test</p>", new ArrayList<String>(), false);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("At least one valid tag must be specified"));
        }

        try {
            Answer.splitHtmlContent("<p>test</p>", Arrays.asList("", "   "), false);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("At least one valid tag must be specified"));
        }
    }

    @Test
    public void testNoMatchingTags() {
        String html = "Just plain text without any target tags";
        List<String> result = Answer.splitHtmlContent(html, Arrays.asList("div", "span"), false);
        List<String> expected = Arrays.asList("Just plain text without any target tags");
        assertEquals(expected, result);
    }
}