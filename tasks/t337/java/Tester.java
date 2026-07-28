package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiPredicate;
import static org.real.temp.Answer.*;
public class Tester {

    static class TestObj {
        private String name;
        private Integer value;

        public TestObj(String name) {
            this.name = name;
        }

        public TestObj(String name, Integer value) {
            this.name = name;
            this.value = value;
        }

        public Integer getValue() {
            return value;
        }

        public String getName() {
            return name;
        }
    }

    @Test
    public void testEmptyList() {
        List<TestObj> objList = new ArrayList<>();
        boolean result = Answer.checkAllSameAttribute(objList, "value");
        assertTrue(result);
    }

    @Test
    public void testAllSameValues() {
        TestObj obj1 = new TestObj("obj1", 10);
        TestObj obj2 = new TestObj("obj2", 10);
        TestObj obj3 = new TestObj("obj3", 10);

        List<TestObj> objList = new ArrayList<>();
        objList.add(obj1);
        objList.add(obj2);
        objList.add(obj3);

        boolean result = Answer.checkAllSameAttribute(objList, "value");
        assertTrue(result);
    }

    @Test
    public void testDifferentValues() {
        TestObj obj1 = new TestObj("obj1", 10);
        TestObj obj2 = new TestObj("obj2", 20);
        TestObj obj3 = new TestObj("obj3", 10);

        List<TestObj> objList = new ArrayList<>();
        objList.add(obj1);
        objList.add(obj2);
        objList.add(obj3);

        boolean result = Answer.checkAllSameAttribute(objList, "value");
        assertFalse(result);
    }

    @Test
    public void testMissingAttributeWithDefault() {
        TestObj obj1 = new TestObj("obj1", 5);
        Object obj2 = new Object();
        TestObj obj3 = new TestObj("obj3", 5);

        List<Object> objList = new ArrayList<>();
        objList.add(obj1);
        objList.add(obj2);
        objList.add(obj3);

        boolean result = Answer.checkAllSameAttribute(objList, "value", null, 5);
        assertTrue(result);
    }

    @Test
    public void testCustomComparator() {
        TestObj obj1 = new TestObj("obj1", 10);
        TestObj obj2 = new TestObj("obj2", 12);
        TestObj obj3 = new TestObj("obj3", 8);

        List<TestObj> objList = new ArrayList<>();
        objList.add(obj1);
        objList.add(obj2);
        objList.add(obj3);

        BiPredicate<Object, Object> withinRange = (a, b) -> {
            if (a == null && b == null) return true;
            if (a == null || b == null) return false;
            if (a instanceof Number && b instanceof Number) {
                return Math.abs(((Number) a).doubleValue() - ((Number) b).doubleValue()) <= 5;
            }
            return a.equals(b);
        };

        boolean result = Answer.checkAllSameAttribute(objList, "value", withinRange, null);
        assertTrue(result);
    }
}
