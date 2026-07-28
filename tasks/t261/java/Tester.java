package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testCalculateAverageDifference_PositiveIntegers() {
        List<Integer> numbers = Arrays.asList(10, 20, 30, 40);
        double result = Answer.calculateAverageDifference(numbers);
        double expected = 10.0;
        assertEquals("The average difference should be 10.0", expected, result, 0.0);
    }

    @Test
    public void testCalculateAverageDifference_MixedPositiveAndNegative() {
        List<Integer> numbers = Arrays.asList(-10, 0, 10, 20);
        double result = Answer.calculateAverageDifference(numbers);
        double expected = 10.0;
        assertEquals("The average difference should be 10.0", expected, result, 0.0);
    }

    @Test
    public void testCalculateAverageDifference_SameValues() {
        List<Integer> numbers = Arrays.asList(5, 5, 5, 5);
        double result = Answer.calculateAverageDifference(numbers);
        double expected = 0.0;
        assertEquals("The average difference should be 0.0 as all values are the same", expected, result, 0.0);
    }

    @Test
    public void testCalculateAverageDifference_SingleElement() {
        List<Integer> numbers = Arrays.asList(100);
        double result = Answer.calculateAverageDifference(numbers);
        double expected = 0.0;
        assertEquals("The average difference should be 0.0 for a single element list", expected, result, 0.0);
    }

    @Test
    public void testCalculateAverageDifference_EmptyList() {
        List<Integer> numbers = Arrays.asList();
        double result = Answer.calculateAverageDifference(numbers);
        double expected = 0.0;
        assertEquals("The average difference should be 0.0 for an empty list", expected, result, 0.0);
    }
}