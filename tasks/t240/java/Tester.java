package org.real.temp;

import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class Tester {
    private static Map<String, String> item(String id, String name) {
        return Map.of("id", id, "name", name);
    }

    @Test
    public void testMergesTwoArraysWithUniqueItems() {
        List<Map<String, String>> arr1 = Arrays.asList(
                item("1", "Item 1"),
                item("2", "Item 2"));
        List<Map<String, String>> arr2 = Arrays.asList(
                item("3", "Item 3"),
                item("4", "Item 4"));

        assertEquals(
                Arrays.asList(
                        item("1", "Item 1"),
                        item("2", "Item 2"),
                        item("3", "Item 3"),
                        item("4", "Item 4")),
                Answer.mergeArraysWithReplacement(arr1, arr2, item -> item.get("id")));
    }

    @Test
    public void testUpdatesExistingItemsWhenIdsMatch() {
        List<Map<String, String>> arr1 = Arrays.asList(
                item("1", "Item 1"),
                item("2", "Item 2"));
        List<Map<String, String>> arr2 = Arrays.asList(
                item("2", "Updated Item 2"),
                item("3", "Item 3"));

        assertEquals(
                Arrays.asList(
                        item("1", "Item 1"),
                        item("2", "Updated Item 2"),
                        item("3", "Item 3")),
                Answer.mergeArraysWithReplacement(arr1, arr2, item -> item.get("id")));
    }

    @Test
    public void testHandlesEmptyArrays() {
        assertEquals(
                Collections.emptyList(),
                Answer.mergeArraysWithReplacement(
                        Collections.<Map<String, String>>emptyList(),
                        Collections.<Map<String, String>>emptyList(),
                        item -> item.get("id")));
    }

    @Test
    public void testMergesWithEmptyFirstArray() {
        List<Map<String, String>> arr2 = Arrays.asList(
                item("1", "Item 1"),
                item("2", "Item 2"));

        assertEquals(
                Arrays.asList(
                        item("1", "Item 1"),
                        item("2", "Item 2")),
                Answer.mergeArraysWithReplacement(Collections.emptyList(), arr2, item -> item.get("id")));
    }

    @Test
    public void testMergesWithEmptySecondArray() {
        List<Map<String, String>> arr1 = Arrays.asList(
                item("1", "Item 1"),
                item("2", "Item 2"));

        assertEquals(
                Arrays.asList(
                        item("1", "Item 1"),
                        item("2", "Item 2")),
                Answer.mergeArraysWithReplacement(arr1, Collections.emptyList(), item -> item.get("id")));
    }

    @Test
    public void testHandlesDuplicateIdsInFirstArray() {
        List<Map<String, String>> arr1 = Arrays.asList(
                item("1", "Item 1"),
                item("1", "Duplicate Item 1"));
        List<Map<String, String>> arr2 = Collections.singletonList(item("2", "Item 2"));

        assertEquals(
                Arrays.asList(
                        item("1", "Duplicate Item 1"),
                        item("2", "Item 2")),
                Answer.mergeArraysWithReplacement(arr1, arr2, item -> item.get("id")));
    }

    @Test
    public void testHandlesDuplicateIdsInSecondArray() {
        List<Map<String, String>> arr1 = Collections.singletonList(item("1", "Item 1"));
        List<Map<String, String>> arr2 = Arrays.asList(
                item("2", "Item 2"),
                item("2", "Duplicate Item 2"));

        assertEquals(
                Arrays.asList(
                        item("1", "Item 1"),
                        item("2", "Duplicate Item 2")),
                Answer.mergeArraysWithReplacement(arr1, arr2, item -> item.get("id")));
    }

    @Test
    public void testMergesArraysWithMixedUniqueAndDuplicateIds() {
        List<Map<String, String>> arr1 = Arrays.asList(
                item("1", "Item 1"),
                item("2", "Item 2"));
        List<Map<String, String>> arr2 = Arrays.asList(
                item("2", "Updated Item 2"),
                item("3", "Item 3"),
                item("1", "New Item 1"));

        assertEquals(
                Arrays.asList(
                        item("1", "New Item 1"),
                        item("2", "Updated Item 2"),
                        item("3", "Item 3")),
                Answer.mergeArraysWithReplacement(arr1, arr2, item -> item.get("id")));
    }
}
