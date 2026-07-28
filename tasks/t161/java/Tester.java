import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void testEmptyArray() {
        assertEquals(Collections.emptyList(), Answer.sortByTimestamp(new ArrayList<>()));
    }

    @Test
    public void testSingleElementArray() {
        List<Map<String, Object>> input = new ArrayList<>(Arrays.asList(row(1, "2021-07-03T12:00:00Z")));
        assertEquals(Arrays.asList(row(1, "2021-07-03T12:00:00Z")), Answer.sortByTimestamp(input));
    }

    @Test
    public void testSortMultipleElements() {
        List<Map<String, Object>> input = new ArrayList<>(Arrays.asList(
                row(3, "2021-07-01T09:45:00Z"),
                row(1, "2021-07-03T12:00:00Z"),
                row(2, "2021-07-02T15:30:00Z")
        ));

        assertEquals(Arrays.asList(
                row(3, "2021-07-01T09:45:00Z"),
                row(2, "2021-07-02T15:30:00Z"),
                row(1, "2021-07-03T12:00:00Z")
        ), Answer.sortByTimestamp(input));
    }

    @Test
    public void testAlreadySortedArray() {
        List<Map<String, Object>> input = new ArrayList<>(Arrays.asList(
                row(1, "2021-07-01T09:45:00Z"),
                row(2, "2021-07-02T15:30:00Z"),
                row(3, "2021-07-03T12:00:00Z")
        ));

        assertEquals(Arrays.asList(
                row(1, "2021-07-01T09:45:00Z"),
                row(2, "2021-07-02T15:30:00Z"),
                row(3, "2021-07-03T12:00:00Z")
        ), Answer.sortByTimestamp(input));
    }

    @Test
    public void testMixedFormatTimestamps() {
        List<Map<String, Object>> input = new ArrayList<>(Arrays.asList(
                row(1, "2021/07/03 12:00:00"),
                row(2, "July 2, 2021 15:30:00"),
                row(3, "2021-07-01T09:45:00Z")
        ));

        assertEquals(Arrays.asList(
                row(3, "2021-07-01T09:45:00Z"),
                row(2, "July 2, 2021 15:30:00"),
                row(1, "2021/07/03 12:00:00")
        ), Answer.sortByTimestamp(input));
    }

    private static Map<String, Object> row(int id, String timestamp) {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", id);
        row.put("timestamp", timestamp);
        return row;
    }
}
