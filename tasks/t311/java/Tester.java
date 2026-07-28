package org.real.temp;

import org.junit.Test;
import org.junit.Rule;
import org.junit.rules.TemporaryFolder;
import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    @Rule
    public TemporaryFolder tempFolder = new TemporaryFolder();

    @Test
    public void testBasicFunctionality() throws IOException {
        File rootDir = tempFolder.newFolder("testsite");

        File page1 = new File(rootDir, "page1.htm");
        Files.write(page1.toPath(), "Test content".getBytes());

        List<String> sitemap = Answer.generateSitemap(rootDir.getAbsolutePath(), "https://example.com");

        assertEquals(2, sitemap.size());
        assertTrue(sitemap.contains("https://example.com/"));
        assertTrue(sitemap.contains("https://example.com/page1.htm"));
    }

    @Test
    public void testUrlTransformFunction() throws IOException {
        File rootDir = tempFolder.newFolder("testsite");

        File indexFile = new File(rootDir, "index.htm");
        Files.write(indexFile.toPath(), "Home page".getBytes());

        Answer.UrlTransformFunction removeIndexTransform = (url, relPath, filename) -> {
            if ("index.htm".equals(filename)) {
                return url.replace("index.htm", "");
            }
            return url;
        };

        List<String> sitemap = Answer.generateSitemap(rootDir.getAbsolutePath(), "https://example.com", removeIndexTransform);

        assertEquals(1, sitemap.size());
        assertTrue(sitemap.contains("https://example.com/"));
        assertFalse(sitemap.stream().anyMatch(url -> url.contains("index.htm")));
    }

    @Test
    public void testSpecialCharactersInFilenames() throws IOException {
        File rootDir = tempFolder.newFolder("testsite");

        String chineseFilename = "ProductIntroduction.htm";

        File aboutFile = new File(rootDir, "about us.htm");
        File productFile = new File(rootDir, chineseFilename);

        Files.write(aboutFile.toPath(), "About page".getBytes());
        Files.write(productFile.toPath(), "Product introduction".getBytes());

        List<String> sitemap = Answer.generateSitemap(rootDir.getAbsolutePath(), "https://example.com");

        assertTrue(sitemap.stream().anyMatch(url -> url.contains("about+us.htm") || url.contains("about%20us.htm")));
        assertTrue(sitemap.stream().anyMatch(url -> url.contains("ProductIntroduction.htm")));
    }

    @Test
    public void testSubdirectoryStructure() throws IOException {
        File rootDir = tempFolder.newFolder("testsite");

        File blogDir = new File(rootDir, "blog");
        blogDir.mkdirs();

        File post1 = new File(blogDir, "post1.htm");
        File post2 = new File(blogDir, "post2.htm");

        Files.write(post1.toPath(), "First blog post".getBytes());
        Files.write(post2.toPath(), "Second blog post".getBytes());

        List<String> sitemap = Answer.generateSitemap(rootDir.getAbsolutePath(), "https://example.com");

        assertEquals(3, sitemap.size());
        assertTrue(sitemap.contains("https://example.com/blog/post1.htm"));
        assertTrue(sitemap.contains("https://example.com/blog/post2.htm"));
    }

    @Test
    public void testExcludeTemplateFiles() throws IOException {
        File rootDir = tempFolder.newFolder("testsite");

        File contactFile = new File(rootDir, "contact.htm");
        File footerTemplate = new File(rootDir, "footer_template.htm");
        File templateHeader = new File(rootDir, "template_header.htm");

        Files.write(contactFile.toPath(), "Contact page".getBytes());
        Files.write(footerTemplate.toPath(), "Footer template".getBytes());
        Files.write(templateHeader.toPath(), "Header template".getBytes());

        List<String> sitemap = Answer.generateSitemap(rootDir.getAbsolutePath(), "https://example.com");

        assertEquals(2, sitemap.size());
        assertTrue(sitemap.contains("https://example.com/contact.htm"));
        assertFalse(sitemap.stream().anyMatch(url -> url.contains("footer_template.htm")));
        assertFalse(sitemap.stream().anyMatch(url -> url.contains("template_header.htm")));
    }
}
