package org.real.temp;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.parseTypeHint;

public class Tester {
    @Test
    public void testBasicTypes() {
        assertEquals(Arrays.asList("int"), parseTypeHint("int"));
    }

    @Test
    public void testListType() {
        assertEquals(Arrays.asList("List", "int"), parseTypeHint("List[int]"));
    }

    @Test
    public void testUnionType() {
        assertEquals(Arrays.asList("Union", "str", "float"), parseTypeHint("Union[str, float]"));
    }

    @Test
    public void testTupleType() {
        assertEquals(Arrays.asList("Tuple", "str", "int", "float"), parseTypeHint("Tuple[str, int, float]"));
    }

    @Test
    public void testComplexType() {
        assertEquals(
                Arrays.asList("List", "Union", "int", "float", "Tuple", "str", "int"),
                parseTypeHint("List[Union[int, float], Tuple[str, int]]")
        );
    }
}
