package org.real.temp;

import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.real.temp.Answer.sortByField;

public class Tester {
    private final List<Map<String, Object>> data = Arrays.asList(
            row("John", 25),
            row("Alice", 30),
            row("Bob", 22),
            row("Charlie", 28)
    );

    @Test
    public void shouldSortByNameInAscendingOrder() {
        assertEquals(Arrays.asList(
                row("Alice", 30),
                row("Bob", 22),
                row("Charlie", 28),
                row("John", 25)
        ), sortByField(data, "name", true));
    }

    @Test
    public void shouldSortByNameInDescendingOrder() {
        assertEquals(Arrays.asList(
                row("John", 25),
                row("Charlie", 28),
                row("Bob", 22),
                row("Alice", 30)
        ), sortByField(data, "name", false));
    }

    @Test
    public void shouldSortByAgeInAscendingOrder() {
        assertEquals(Arrays.asList(
                row("Bob", 22),
                row("John", 25),
                row("Charlie", 28),
                row("Alice", 30)
        ), sortByField(data, "age", true));
    }

    @Test
    public void shouldSortByAgeInDescendingOrder() {
        assertEquals(Arrays.asList(
                row("Alice", 30),
                row("Charlie", 28),
                row("John", 25),
                row("Bob", 22)
        ), sortByField(data, "age", false));
    }

    @Test
    public void shouldSortNumericFieldsByValueNotText() {
        List<Map<String, Object>> mixedAges = Arrays.asList(
                row("Ten", 10),
                row("Two", 2),
                row("One", 1)
        );

        assertEquals(Arrays.asList(
                row("One", 1),
                row("Two", 2),
                row("Ten", 10)
        ), sortByField(mixedAges, "age", true));
    }

    @Test
    public void shouldThrowWhenFieldIsUnavailable() {
        try {
            sortByField(Collections.emptyList(), "name", true);
            fail("Expected an IllegalArgumentException for an empty list.");
        } catch (IllegalArgumentException expected) {
        }

        try {
            sortByField(Arrays.asList(row("Alice", 30)), "height", true);
            fail("Expected an IllegalArgumentException for a missing field.");
        } catch (IllegalArgumentException expected) {
        }
    }

    private static Map<String, Object> row(String name, int age) {
        Map<String, Object> row = new HashMap<>();
        row.put("name", name);
        row.put("age", age);
        return row;
    }
}
