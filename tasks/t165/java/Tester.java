import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class Tester {
    private Document createMockDocument(String html) {
        return Jsoup.parse(html);
    }

    @Test
    public void testTableWithMultipleRowsAndColumns() {
        String html = "<table class=\"waffle\"><tbody>"
                + "<tr><td>Cell 1</td><td>Cell 2</td></tr>"
                + "<tr><td>Cell 3</td><td>Cell 4</td></tr>"
                + "</tbody></table>";
        List<List<String>> expected = Arrays.asList(
                Arrays.asList("Cell 1", "Cell 2"),
                Arrays.asList("Cell 3", "Cell 4")
        );

        assertEquals(expected, Answer.extractHtmlWaffleTableToCsvData(createMockDocument(html)));
    }

    @Test
    public void testTableWithEmptyCells() {
        String html = "<table class=\"waffle\"><tbody>"
                + "<tr><td>Cell 1</td><td></td></tr>"
                + "<tr><td></td><td>Cell 4</td></tr>"
                + "</tbody></table>";
        List<List<String>> expected = Arrays.asList(
                Arrays.asList("Cell 1", ""),
                Arrays.asList("", "Cell 4")
        );

        assertEquals(expected, Answer.extractHtmlWaffleTableToCsvData(createMockDocument(html)));
    }

    @Test
    public void testTableWithOnlyOneRow() {
        String html = "<table class=\"waffle\"><tbody>"
                + "<tr><td>Single Cell 1</td><td>Single Cell 2</td></tr>"
                + "</tbody></table>";

        assertEquals(
                Collections.singletonList(Arrays.asList("Single Cell 1", "Single Cell 2")),
                Answer.extractHtmlWaffleTableToCsvData(createMockDocument(html))
        );
    }

    @Test
    public void testTableWithOnlyOneColumn() {
        String html = "<table class=\"waffle\"><tbody>"
                + "<tr><td>Column Cell 1</td></tr>"
                + "<tr><td>Column Cell 2</td></tr>"
                + "</tbody></table>";
        List<List<String>> expected = Arrays.asList(
                Collections.singletonList("Column Cell 1"),
                Collections.singletonList("Column Cell 2")
        );

        assertEquals(expected, Answer.extractHtmlWaffleTableToCsvData(createMockDocument(html)));
    }

    @Test
    public void testNoTableWithClassWafflePresent() {
        String html = "<div><p>No table here!</p></div>";

        assertEquals(
                Collections.emptyList(),
                Answer.extractHtmlWaffleTableToCsvData(createMockDocument(html))
        );
    }
}
