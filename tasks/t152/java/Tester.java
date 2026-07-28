import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void emptyStylesheetReturnsEmptyString() {
        assertEquals("", Answer.extractCssFromStylesheet(""));
    }

    @Test
    public void invalidInputReturnsEmptyString() {
        assertEquals("", Answer.extractCssFromStylesheet(null));
        assertEquals("", Answer.extractCssFromStylesheet(new Object()));
        assertEquals("", Answer.extractCssFromStylesheet("not a stylesheet"));
    }

    @Test
    public void restrictedStylesheetReturnsEmptyString() {
        assertEquals("", Answer.extractCssFromStylesheet(null));
    }

    @Test
    public void inlineCssReturnsCssText() {
        assertEquals("div {font-size: 16px;}", Answer.extractCssFromStylesheet("div { font-size: 16px; }"));
    }

    @Test
    public void multipleCssRulesReturnConcatenatedCssText() {
        assertEquals(
                "body {background-color: red;}p {color: blue;}",
                Answer.extractCssFromStylesheet("body { background-color: red; } p { color: blue; }")
        );
    }
}
