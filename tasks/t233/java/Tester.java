import org.junit.Test;

import java.util.Collections;
import java.util.Map;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class Tester {
    @Test
    public void testEqualDepthAndStructure() {
        Map<String, Object> objA = Map.of("a", Map.of("b", Map.of("c", 1)), "d", 2);
        Map<String, Object> objB = Map.of("a", Map.of("b", Map.of("c", 3)), "d", 4);
        assertFalse(Answer.compareObjectsDepth(objA, objB));
    }

    @Test
    public void testDifferentStructureMissingKey() {
        Map<String, Object> objA = Map.of("a", Map.of("b", Map.of("c", 1)), "d", 2);
        Map<String, Object> objC = Map.of("a", Map.of("b", Map.of("c", 3)), "e", 4);
        assertFalse(Answer.compareObjectsDepth(objA, objC));
    }

    @Test
    public void testDifferentDepth() {
        Map<String, Object> objA = Map.of("a", Map.of("b", Map.of("c", 1)), "d", 2);
        Map<String, Object> objD = Map.of("a", Map.of("b", 1), "d", 2);
        assertFalse(Answer.compareObjectsDepth(objA, objD));
    }

    @Test
    public void testNonObjectInputs() {
        Map<String, Object> objA = Map.of("a", Map.of("b", Map.of("c", 1)), "d", 2);
        assertFalse(Answer.compareObjectsDepth(objA, null));
    }

    @Test
    public void testDifferentTypes() {
        Map<String, Object> objA = Map.of("a", Map.of("b", 1), "d", 2);
        Map<String, Object> objF = Map.of("a", Map.of("b", Map.of("c", 3)), "d", 4);
        assertFalse(Answer.compareObjectsDepth(objA, objF));
    }

    @Test
    public void testIdenticalEmptyObjects() {
        assertTrue(Answer.compareObjectsDepth(Collections.emptyMap(), Collections.emptyMap()));
    }
}
