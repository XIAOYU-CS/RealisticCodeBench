package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.HashMap;
import java.util.Map;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicAlnumFiltering() {
        String text = "Hello, World! 123";
        String result = Answer.enhancedTextProcessor(
            text,
            true,
            "upper",
            null
        );
        assertEquals("HELLOWORLD123", result);
    }

    @Test
    public void testCharacterReplacement() {
        String text = "Hello @World# 123";
        Map<Character, String> replaceMap = new HashMap<>();
        replaceMap.put('@', "at");
        replaceMap.put('#', "hash");
        String result = Answer.enhancedTextProcessor(
            text,
            true,
            "upper",
            replaceMap
        );
        assertEquals("HELLOATWORLDHASH123", result);
    }

    @Test
    public void testCaseTransformationLower() {
        String text = "Hello, World! 123";
        String result = Answer.enhancedTextProcessor(
            text,
            true,
            "lower",
            null
        );
        assertEquals("helloworld123", result);
    }

    @Test
    public void testNoAlnumFiltering() {
        String text = "Hello, World! 123";
        String result = Answer.enhancedTextProcessor(
            text,
            false,
            "upper",
            null
        );
        assertEquals("HELLO, WORLD! 123", result);
    }

    @Test
    public void testComplexReplacementAndFiltering() {
        String text = "Email: user@domain.com #123";
        Map<Character, String> replaceMap = new HashMap<>();
        replaceMap.put('@', " at ");
        replaceMap.put('#', "number ");
        String result = Answer.enhancedTextProcessor(
            text,
            true,
            "upper",
            replaceMap
        );
        assertEquals("EMAILUSERATDOMAINCOMNUMBER123", result);
    }
}