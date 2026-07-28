package org.real.temp;
import org.junit.Test;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testUnigramProbability() {
        List<String> context = Collections.emptyList();
        String word = "hello";
        double result = prob(context, word);
        assertEquals(0.5, result, 0.0);
    }

    @Test
    public void testBigramProbability() {
        List<String> context = Arrays.asList("hello");
        String word = "world";
        double result = prob(context, word);
        assertEquals(0.8, result, 0.0);
    }

    @Test
    public void testTrigramProbability() {
        List<String> context = Arrays.asList("hello", "world");
        String word = "test";
        double result = prob(context, word);
        assertEquals(0.75, result, 0.0);
    }

    @Test
    public void testZeroProbabilityUnknownWord() {
        List<String> context = Arrays.asList("hello");
        String word = "unknown";
        double result = prob(context, word);
        assertEquals(0.0, result, 0.0);
    }

    @Test
    public void testZeroProbabilityUnknownContext() {
        List<String> context = Arrays.asList("unknown");
        String word = "world";
        double result = prob(context, word);
        assertEquals(0.0, result, 0.0);
    }
}