package org.real.temp;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import static org.real.temp.Answer.*;

public class Tester {
    
    private String testXamlFile;
    
    @Before
    public void setUp() throws IOException {
        testXamlFile = "test_file.xaml";
    }
    
    @After
    public void tearDown() {
        try {
            Files.deleteIfExists(Paths.get(testXamlFile));
        } catch (IOException e) {
            System.err.println("Could not delete test file: " + e.getMessage());
        }
    }
    
    @Test
    public void testValidXamlWithMultipleStrings() throws IOException {
        String xamlContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                           "<root>\n" +
                           "  <String Key=\"title\">Hello World</String>\n" +
                           "  <String Key=\"description\">This is a test</String>\n" +
                           "  <String Key=\"author\">John Doe</String>\n" +
                           "</root>";
        
        try (FileWriter writer = new FileWriter(testXamlFile)) {
            writer.write(xamlContent);
        }
        
        Map<String, String> result = Answer.parseXamlToDict(testXamlFile);
        
        assertNotNull("Result map should not be null", result);
        assertEquals("Map should have 3 entries", 3, result.size());
        assertEquals("Title should match", "Hello World", result.get("title"));
        assertEquals("Description should match", "This is a test", result.get("description"));
        assertEquals("Author should match", "John Doe", result.get("author"));
    }
    
    @Test
    public void testXamlWithEmptyStringValues() throws IOException {
        String xamlContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                           "<root>\n" +
                           "  <String Key=\"empty\"> </String>\n" +
                           "  <String Key=\"blank\"></String>\n" +
                           "  <String Key=\"normal\">value</String>\n" +
                           "</root>";
        
        try (FileWriter writer = new FileWriter(testXamlFile)) {
            writer.write(xamlContent);
        }
        
        Map<String, String> result = Answer.parseXamlToDict(testXamlFile);
        
        assertNotNull("Result map should not be null", result);
        assertEquals("Map should have 3 entries", 3, result.size());
        assertEquals("Empty value should be preserved", " ", result.get("empty"));
        assertTrue("Blank value should be empty", result.get("blank").isEmpty());
        assertEquals("Normal value should match", "value", result.get("normal"));
    }
    
    @Test
    public void testXamlWithNoStringElements() throws IOException {
        String xamlContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                           "<root>\n" +
                           "  <OtherElement Key=\"test\">Some content</OtherElement>\n" +
                           "  <AnotherElement attribute=\"value\" />\n" +
                           "</root>";
        
        try (FileWriter writer = new FileWriter(testXamlFile)) {
            writer.write(xamlContent);
        }
        
        Map<String, String> result = Answer.parseXamlToDict(testXamlFile);
        
        assertNotNull("Result map should not be null", result);
        assertTrue("Map should be empty when no String elements exist", result.isEmpty());
    }
    
    @Test
    public void testNonExistentFile() {
        String nonExistentFile = "non_existent_file.xaml";
        
        Map<String, String> result = Answer.parseXamlToDict(nonExistentFile);
        
        assertNotNull("Result map should not be null", result);
        assertTrue("Map should be empty when file doesn't exist", result.isEmpty());
    }
    
    @Test
    public void testXamlWithMalformedXml() throws IOException {
        // Create a XAML file with malformed XML
        String xamlContent = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
                           "<root>\n" +
                           "  <String Key=\"valid\">value</String>\n" +
                           "  <String Key=\"invalid\">unclosed\n" +
                           "</root>";
        
        try (FileWriter writer = new FileWriter(testXamlFile)) {
            writer.write(xamlContent);
        }
        
        Map<String, String> result = Answer.parseXamlToDict(testXamlFile);
        
        assertNotNull("Result map should not be null", result);
        assertTrue("Map should be empty when XML is malformed", result.isEmpty());
    }
}