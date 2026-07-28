package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicLineCommentRemoval() {
        String query = "SELECT * FROM users\n\n# This is a comment\nWHERE id = 1";
        String result = Answer.cleanQuery(query);
        String expected = "SELECT * FROM users\n\nWHERE id = 1";
        assertEquals(expected, result);
    }

    @Test
    public void testCollapseWhitespaceMode() {
        String query = "SELECT * FROM users\n\n# Comment line\n\nWHERE id = 1\n\n\nAND name = 'John'";
        String result = Answer.cleanQuery(query, "collapse");
        String expected = "SELECT * FROM users\n\nWHERE id = 1\n\nAND name = 'John'";
        assertEquals(expected, result);
    }

    @Test
    public void testCustomCommentRules() {
        String query = "SELECT * FROM users\n-- This is a SQL comment\nWHERE id = 1 /* inline comment */ AND status = 'active'\n/* Multi-line\n   comment */\nORDER BY name";

        Map<String, Object> commentRules = new HashMap<>();
        commentRules.put("line_comment", Arrays.asList("#", "--"));
        List<List<String>> blockComments = new ArrayList<>();
        List<String> blockPair = Arrays.asList("/*", "*/");
        blockComments.add(blockPair);
        commentRules.put("block_comment", blockComments);

        String result = Answer.cleanQuery(query, "collapse", commentRules);
        String expected = "SELECT * FROM users\n\nWHERE id = 1  AND status = 'active'\n\nORDER BY name";
        assertEquals(expected, result);
    }

    @Test
    public void testRemoveWhitespaceMode() {
        String query = "SELECT * FROM users\n\n\n\nWHERE id = 1\n\nAND name = 'John'\n\n\nORDER BY name";
        String result = Answer.cleanQuery(query, "remove");
        String expected = "SELECT * FROM users\nWHERE id = 1\nAND name = 'John'\nORDER BY name";
        assertEquals(expected, result);
    }

    @Test
    public void testBlockCommentSpanningMultipleLines() {
        String query = "SELECT id, name /* This is a\nmulti-line comment\nthat spans several lines */ FROM users\nWHERE /* another comment */ id > 0";

        Map<String, Object> commentRules = new HashMap<>();
        commentRules.put("line_comment", Arrays.asList("#"));
        List<List<String>> blockComments = new ArrayList<>();
        List<String> blockPair = Arrays.asList("/*", "*/");
        blockComments.add(blockPair);
        commentRules.put("block_comment", blockComments);

        String result = Answer.cleanQuery(query, "collapse", commentRules);
        String expected = "SELECT id, name\n\nFROM users\nWHERE  id > 0";
        assertEquals(expected, result);
    }
}
