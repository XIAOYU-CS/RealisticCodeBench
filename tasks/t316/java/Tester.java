package org.real.temp;

import org.junit.Before;
import org.junit.Test;

import java.util.*;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private List<Map<String, Object>> testData;

    @Before
    public void setUp() {
        testData = new ArrayList<>();
        testData.add(createMap("Alice", 30, 50000));
        testData.add(createMap("Bob", 25, 60000));
        testData.add(createMap("Charlie", 35, 45000));
        testData.add(createMap("David", 30, 55000));
        testData.add(createMap("Eve", 28, null));
    }

    private Map<String, Object> createMap(String name, Integer age, Integer salary) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        if (age != null) map.put("age", age);
        if (salary != null) map.put("salary", salary);
        return map;
    }

    @Test
    public void testSortSingleFieldAscending() {
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("age", true));
        List<Map<String, Object>> result = Answer.sortDictsByFields(testData, sortFields, "default", 0);

        List<Integer> ages = new ArrayList<>();
        for (Map<String, Object> item : result) {
            ages.add((Integer) item.get("age"));
        }
        assertEquals(Arrays.asList(25, 28, 30, 30, 35), ages);

        Optional<Map<String, Object>> eve = result.stream()
                .filter(m -> "Eve".equals(m.get("name")))
                .findFirst();
        assertTrue(eve.isPresent());
        assertEquals(28, eve.get().get("age"));
    }

    @Test
    public void testSortSingleFieldDescending() {
        List<Map<String, Object>> data = Arrays.asList(
                createMap("A", null, 100),
                createMap("B", null, 200),
                createMap("C", null, null)
        );
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("salary", false));
        List<Map<String, Object>> result = Answer.sortDictsByFields(data, sortFields, "default", 0);

        List<String> names = new ArrayList<>();
        for (Map<String, Object> item : result) {
            names.add((String) item.get("name"));
        }
        assertEquals(Arrays.asList("B", "A", "C"), names);
    }

    @Test
    public void testSortMultipleFields() {
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("age", true));
        List<Map<String, Object>> result = Answer.sortDictsByFields(testData, sortFields, "default", 0);

        List<String> names = new ArrayList<>();
        for (Map<String, Object> item : result) {
            names.add((String) item.get("name"));
        }
        assertEquals(Arrays.asList("Bob", "Eve", "Alice", "David", "Charlie"), names);
    }

    @Test
    public void testMissingStrategyFirst() {
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("salary", true));
        List<Map<String, Object>> result = Answer.sortDictsByFields(testData, sortFields, "first", null);

        assertEquals("Eve", result.get(0).get("name"));
    }

    @Test
    public void testMissingStrategyLast() {
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("salary", true));
        List<Map<String, Object>> result = Answer.sortDictsByFields(testData, sortFields, "last", null);

        assertEquals("Eve", result.get(result.size() - 1).get("name"));
    }

    @Test
    public void testEmptyList() {
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("age", true));
        List<Map<String, Object>> result = Answer.sortDictsByFields(new ArrayList<>(), sortFields, "default", 0);

        assertTrue(result.isEmpty());
    }

    @Test
    public void testStringFieldsAscending() {
        List<Answer.SortField> sortFields = Collections.singletonList(new Answer.SortField("name", true));
        List<Map<String, Object>> result = Answer.sortDictsByFields(testData, sortFields, "default", null);

        List<String> names = new ArrayList<>();
        for (Map<String, Object> item : result) {
            names.add((String) item.get("name"));
        }
        List<String> expected = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");
        Collections.sort(expected);
        assertEquals(expected, names);
    }
}
