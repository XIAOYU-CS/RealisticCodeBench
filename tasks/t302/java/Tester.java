package org.real.temp;

import static org.junit.Assert.assertEquals;
import org.junit.Test;
import java.util.Arrays;
import java.util.List;

public class Tester {

    @Test
    public void testDefaultBehavior() {
        String path = "/artifacts/workspace/project_items/";
        String result = Answer.customFormatFilePath(path);
        assertEquals("artifacts_workspace_project_items", result);
    }

    @Test
    public void testCustomSeparatorsAndReplacements() {
        String path = "bundle\\include\\my_file";
        String result = Answer.customFormatFilePath(
            path,
            "\\",
            "-",
            ""
        );
        assertEquals("bundle-include-my_file", result);
    }

    @Test
    public void testCustomRemoveItemsAndSuffixes() {
        String path = "src/resources/data_logs_v2";
        List<String> removeItems = Arrays.asList("src", "logs");
        List<String> extraSuffixes = Arrays.asList("_v2", "_data");

        String result = Answer.customFormatFilePath(
            path,
            removeItems,
            extraSuffixes
        );
        assertEquals("resources", result);
    }

    @Test
    public void testEmptyPathAndEdgeCases() {
        assertEquals("", Answer.customFormatFilePath(""));
        assertEquals("", Answer.customFormatFilePath("////"));
        assertEquals("properties_items", Answer.customFormatFilePath("properties/items"));
    }

    @Test
    public void testStripCharsBehavior() {
        String path = "__resources/project__";
        assertEquals("resources_project", Answer.customFormatFilePath(path));

        String path2 = "--bundle/data--";
        List<String> removeItems = Arrays.asList("bundle");
        String result = Answer.customFormatFilePath(
            path2,
            "-",
            removeItems
        );
        assertEquals("data", result);
    }
}
