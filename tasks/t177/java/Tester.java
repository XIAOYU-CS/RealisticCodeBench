import org.junit.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void testEmptyArray() {
        assertEquals(Arrays.asList(), Answer.sortByKey(Arrays.asList(), "name"));
    }

    @Test
    public void testSingleElement() {
        List<Map<String, Object>> input = Arrays.asList(item("Apple"));
        assertEquals(Arrays.asList(item("Apple")), Answer.sortByKey(input, "name"));
    }

    @Test
    public void testSortByKey() {
        List<Map<String, Object>> input = Arrays.asList(item("banana"), item("apple"), item("orange"));
        List<Map<String, Object>> expected = Arrays.asList(item("apple"), item("banana"), item("orange"));
        assertEquals(expected, Answer.sortByKey(input, "name"));
    }

    @Test
    public void testCaseInsensitiveSorting() {
        List<Map<String, Object>> input = Arrays.asList(item("banana"), item("Apple"), item("orange"));
        List<Map<String, Object>> expected = Arrays.asList(item("Apple"), item("banana"), item("orange"));
        assertEquals(expected, Answer.sortByKey(input, "name"));
    }

    @Test
    public void testMissingKeySortsBeforeNamedValues() {
        List<Map<String, Object>> input = Arrays.asList(item("beta"), itemWithoutName(), item("Alpha"));
        List<Map<String, Object>> expected = Arrays.asList(itemWithoutName(), item("Alpha"), item("beta"));
        assertEquals(expected, Answer.sortByKey(input, "name"));
    }

    private static Map<String, Object> item(String name) {
        Map<String, Object> item = new HashMap<>();
        item.put("name", name);
        return item;
    }

    private static Map<String, Object> itemWithoutName() {
        Map<String, Object> item = new HashMap<>();
        item.put("other", "missing name");
        return item;
    }
}
