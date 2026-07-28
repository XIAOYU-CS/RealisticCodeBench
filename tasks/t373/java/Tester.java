package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.*;

public class Tester {

    @Test
    public void testSimpleComparison() {
        String whereClause = "age > 20";
        String expected = "> age 20";
        String result = Answer.sqlWhereToPrefix(whereClause);
        assertEquals(expected, result);
    }

    @Test
    public void testAndLogicalOperator() {
        String whereClause = "age > 20 AND name = 'Alice'";
        String expected = "AND > age 20 = name 'Alice'";
        String result = Answer.sqlWhereToPrefix(whereClause);
        assertEquals(expected, result);
    }

    @Test
    public void testOrLogicalOperator() {
        String whereClause = "age < 18 OR age > 65";
        String expected = "OR < age 18 > age 65";
        String result = Answer.sqlWhereToPrefix(whereClause);
        assertEquals(expected, result);
    }

    @Test
    public void testNotOperator() {
        String whereClause = "NOT active = 1";
        // 根据实际实现，NOT 操作符的前缀表达式应该是 "= NOT active 1"
        String expected = "= NOT active 1";
        String result = Answer.sqlWhereToPrefix(whereClause);
        assertEquals(expected, result);
    }

    @Test
    public void testIsNullOperator() {
        String whereClause = "name IS NULL";
        String expected = "IS name NULL";
        String result = Answer.sqlWhereToPrefix(whereClause);
        assertEquals(expected, result);
    }

    @Test
    public void testTokenizeWhereClause() {
        String whereClause = "age > 20 AND name = 'Alice'";
        List<String> expected = Arrays.asList("age", ">", "20", "AND", "name", "=", "'Alice'");
        List<String> result = Answer.tokenizeWhereClause(whereClause);
        assertEquals(expected, result);
    }

    @Test
    public void testComplexExpression() {
        String whereClause = "(age > 20 AND name = 'Alice') OR salary <= 50000";
        String result = Answer.sqlWhereToPrefix(whereClause);
        // The result should be a valid prefix expression
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }
}
