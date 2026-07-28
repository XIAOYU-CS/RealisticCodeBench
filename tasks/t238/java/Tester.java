package org.real.temp;

import org.junit.Test;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class Tester {
    private static Map<String, Object> map(Object... pairs) {
        Map<String, Object> result = new HashMap<>();
        for (int i = 0; i < pairs.length; i += 2) {
            result.put((String) pairs[i], pairs[i + 1]);
        }
        return result;
    }

    @Test
    public void handlesNullObj2() {
        Map<String, Object> obj1 = map("a", 1, "b", 2);
        assertEquals(obj1, Answer.mergeObjectsDeeply(obj1, null));
    }

    @Test
    public void mergesNestedObjects() {
        Map<String, Object> obj1 = map("a", map("b", map("c", 1)), "d", 2);
        Map<String, Object> obj2 = map("a", map("b", map("d", 3)), "e", 4);

        assertEquals(
                map("a", map("b", map("c", 1, "d", 3)), "d", 2, "e", 4),
                Answer.mergeObjectsDeeply(obj1, obj2)
        );
    }

    @Test
    public void emptyObj1PreservesObj2Values() {
        Map<String, Object> obj2 = map("a", 1, "b", map("c", 2));
        assertEquals(obj2, Answer.mergeObjectsDeeply(map(), obj2));
    }

    @Test
    public void usesObj1ValuesWhenPropertyTypesConflict() {
        Map<String, Object> obj1 = map("a", 1, "b", null, "c", map("nested", true));
        Map<String, Object> obj2 = map("a", map("old", true), "b", map("old", true), "c", 3, "d", 4);

        assertEquals(
                map("a", 1, "b", null, "c", map("nested", true), "d", 4),
                Answer.mergeObjectsDeeply(obj1, obj2)
        );
    }

    @Test
    public void doesNotMergeListsButTakesThemFromObj1() {
        Map<String, Object> obj1 = map("a", Arrays.asList(1, 2, 3));
        Map<String, Object> obj2 = map("a", Arrays.asList(4, 5), "b", 6);

        assertEquals(map("a", Arrays.asList(1, 2, 3), "b", 6), Answer.mergeObjectsDeeply(obj1, obj2));
    }
}
