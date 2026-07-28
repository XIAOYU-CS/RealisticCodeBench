package org.real.temp;

import org.junit.*;
import org.junit.rules.TemporaryFolder;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Rule
    public TemporaryFolder tempFolder = new TemporaryFolder();

    private File testDir;

    @Before
    public void setUp() throws Exception {
        testDir = tempFolder.newFolder("testDir");
    }

    private String createConfigFile(Map<String, Object> configData, String filename) throws IOException {
        File configFile = new File(testDir, filename);
        try (FileWriter writer = new FileWriter(configFile)) {
            new com.google.gson.Gson().toJson(configData, writer);
        }
        return configFile.getAbsolutePath();
    }

    @Test
    public void testBasicStringReplacement() throws Exception {
        Map<String, Object> config = new HashMap<>();
        config.put("replacements", new Object[]{
            Map.of("pattern", "hello", "replacement", "hi"),
            Map.of("pattern", "world", "replacement", "universe")
        });

        String configPath = createConfigFile(config, "basic_config.json");
        String inputText = "hello world, this is a hello test";
        String expected = "hi universe, this is a hi test";

        String result = Answer.replaceTextWithConfig(inputText, configPath);
        assertEquals(expected, result);
    }

    @Test
    public void testRegexPatternReplacement() throws Exception {
        Map<String, Object> config = new HashMap<>();
        config.put("replacements", new Object[]{
            Map.of("pattern", "\\d{3}-\\d{3}-\\d{4}", "replacement", "XXX-XXX-XXXX"),
            Map.of("pattern", "\\bcat\\b", "replacement", "dog")
        });

        String configPath = createConfigFile(config, "regex_config.json");
        String inputText = "Call 123-456-7890 for cat support";
        String expected = "Call XXX-XXX-XXXX for dog support";

        String result = Answer.replaceTextWithConfig(inputText, configPath, true);
        assertEquals(expected, result);
    }

    @Test
    public void testEmptyReplacementsList() throws Exception {
        Map<String, Object> config = new HashMap<>();
        config.put("replacements", new Object[]{});

        String configPath = createConfigFile(config, "empty_config.json");
        String inputText = "This text should remain unchanged";
        String expected = "This text should remain unchanged";

        String result = Answer.replaceTextWithConfig(inputText, configPath);
        assertEquals(expected, result);
    }

    @Test
    public void testSpecialCharactersAndUnicode() throws Exception {
        Map<String, Object> config = new HashMap<>();
        config.put("replacements", new Object[]{
            Map.of("pattern", "café", "replacement", "coffee"),
            Map.of("pattern", "&", "replacement", "and")
        });

        String configPath = createConfigFile(config, "unicode_config.json");
        String inputText = "I love café & tea";
        String expected = "I love coffee and tea";

        String result = Answer.replaceTextWithConfig(inputText, configPath);
        assertEquals(expected, result);
    }

    @Test
    public void testMultipleOverlappingReplacements() throws Exception {
        Map<String, Object> config = new HashMap<>();
        config.put("replacements", new Object[]{
            Map.of("pattern", "abc", "replacement", "xyz"),
            Map.of("pattern", "xyz", "replacement", "123"),
            Map.of("pattern", "123", "replacement", "final")
        });

        String configPath = createConfigFile(config, "overlapping_config.json");
        String inputText = "The sequence abc should be replaced";
        String expected = "The sequence final should be replaced";

        String result = Answer.replaceTextWithConfig(inputText, configPath);
        assertEquals(expected, result);
    }
}
