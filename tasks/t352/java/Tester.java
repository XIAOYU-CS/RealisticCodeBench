package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.List;
import java.util.Map;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testShouldParseBasicCsvWithNoQuotes() {
        String csv = "Name,Age,City\n" +
                     "Alice,25,New York\n" +
                     "Bob,30,Los Angeles";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);

        assertEquals(3, result.size());

        assertEquals("Name", result.get(0).get("columnName"));
        assertEquals("string", result.get(0).get("dataType"));
        assertEquals(2, ((List<?>) result.get(0).get("sampleValues")).size());
        assertEquals("Alice", ((List<?>) result.get(0).get("sampleValues")).get(0));
        assertEquals("Bob", ((List<?>) result.get(0).get("sampleValues")).get(1));
        assertEquals(2, result.get(0).get("totalCount"));
        assertEquals(0, result.get(0).get("emptyCount"));
        assertEquals(2, result.get(0).get("nonEmptyCount"));

        assertEquals("Age", result.get(1).get("columnName"));
        assertEquals("number", result.get(1).get("dataType"));
        assertEquals(2, ((List<?>) result.get(1).get("sampleValues")).size());
        assertEquals("25", ((List<?>) result.get(1).get("sampleValues")).get(0));
        assertEquals("30", ((List<?>) result.get(1).get("sampleValues")).get(1));
        assertEquals(2, result.get(1).get("totalCount"));
        assertEquals(0, result.get(1).get("emptyCount"));
        assertEquals(2, result.get(1).get("nonEmptyCount"));

        assertEquals("City", result.get(2).get("columnName"));
        assertEquals("string", result.get(2).get("dataType"));
    }

    @Test
    public void testShouldHandleQuotedFieldsContainingCommas() {
        String csv = "Name,Title\n" +
                     "\"Alice, Jr.\",Engineer\n" +
                     "Bob,\"Senior, Manager\"";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);

        assertEquals(2, result.size());
        assertEquals("Alice, Jr.", ((List<?>) result.get(0).get("sampleValues")).get(0));
        assertEquals("Bob", ((List<?>) result.get(0).get("sampleValues")).get(1));
        assertEquals("Engineer", ((List<?>) result.get(1).get("sampleValues")).get(0));
        assertEquals("Senior, Manager", ((List<?>) result.get(1).get("sampleValues")).get(1));
    }

    @Test
    public void testShouldInferNumberTypeForNumericColumns() {
        String csv = "Id,Score\n" +
                     "1,95.5\n" +
                     "2,87\n" +
                     "3,100";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);

        assertEquals("number", result.get(0).get("dataType"));
        assertEquals("number", result.get(1).get("dataType"));
    }

    @Test
    public void testShouldInferBooleanTypeForTrueFalseColumns() {
        String csv = "Name,Active,Verified\n" +
                     "Alice,true,TRUE\n" +
                     "Bob,false,FALSE";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);

        assertEquals("boolean", result.get(1).get("dataType"));
        assertEquals("boolean", result.get(2).get("dataType"));
    }

    @Test
    public void testShouldMarkColumnAsMixedIfContainsBothNumbersAndStrings() {
        String csv = "Value\n" +
                     "123\n" +
                     "abc\n" +
                     "456";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);

        assertEquals("mixed", result.get(0).get("dataType"));
    }

    @Test
    public void testShouldHandleEmptyCellsAndCountThem() {
        String csv = "Name,Age\n" +
                     "Alice,\n" +
                     ",30\n" +
                     "Bob,25";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);

        assertEquals("Name", result.get(0).get("columnName"));
        assertEquals(1, result.get(0).get("emptyCount"));
        assertEquals(2, result.get(0).get("nonEmptyCount"));

        assertEquals("Age", result.get(1).get("columnName"));
        assertEquals(1, result.get(1).get("emptyCount"));
        assertEquals(2, result.get(1).get("nonEmptyCount"));
    }

    @Test
    public void testShouldHandleRowsWithFewerColumns() {
        String csv = "A,B,C\n" +
                     "1,2,3\n" +
                     "4,5\n" +
                     "6,7,8";

        List<Map<String, Object>> result = Answer.getColumnDetails(csv);
        assertEquals(3, result.size());
        assertEquals("1", ((List<?>) result.get(0).get("sampleValues")).get(0));
        assertEquals("4", ((List<?>) result.get(0).get("sampleValues")).get(1));
        assertEquals("6", ((List<?>) result.get(0).get("sampleValues")).get(2));

        assertEquals("2", ((List<?>) result.get(1).get("sampleValues")).get(0));
        assertEquals("5", ((List<?>) result.get(1).get("sampleValues")).get(1));
        assertEquals("7", ((List<?>) result.get(1).get("sampleValues")).get(2));

        assertEquals("3", ((List<?>) result.get(2).get("sampleValues")).get(0));
        assertEquals("8", ((List<?>) result.get(2).get("sampleValues")).get(1));

        assertEquals(1, result.get(2).get("emptyCount"));
    }

    @Test
    public void testShouldReturnEmptyArrayForEmptyInput() {
        assertEquals(0, Answer.getColumnDetails("").size());
        assertEquals(0, Answer.getColumnDetails("\n\n").size());
    }

    @Test
    public void testShouldHandleCsvWithOnlyHeader() {
        String csv = "Name,Age";
        List<Map<String, Object>> result = Answer.getColumnDetails(csv);
        assertEquals(2, result.size());
        assertEquals("Name", result.get(0).get("columnName"));
        assertEquals("empty", result.get(0).get("dataType"));
        assertEquals(0, result.get(0).get("totalCount"));
        assertEquals(0, result.get(0).get("emptyCount"));
        assertEquals(0, result.get(0).get("nonEmptyCount"));
        assertEquals(0, ((List<?>) result.get(0).get("sampleValues")).size());
    }

    @Test
    public void testShouldTrimWhitespaceFromFields() {
        String csv = " Name , \" Age \" \n" +
                     "  Alice  , \"  25  \" ";
        List<Map<String, Object>> result = Answer.getColumnDetails(csv);
        assertEquals("Name", result.get(0).get("columnName"));
        assertEquals("Age", result.get(1).get("columnName"));
        assertEquals("Alice", ((List<?>) result.get(0).get("sampleValues")).get(0));
        assertEquals("25", ((List<?>) result.get(1).get("sampleValues")).get(0));
    }
}