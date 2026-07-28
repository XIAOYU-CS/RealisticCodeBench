package org.real.temp;

import static org.junit.Assert.assertEquals;
import org.junit.Test;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class Tester {
    private static final String FIXTURE_DIR = "/Users/bytedance/project/realistic_code_check/final_realistic_code_bench/envs/python/test_case/t249/";

    @Test
    public void testEmptyFile() {
        assertEquals(" \n", Answer.extractTextFromPdf(FIXTURE_DIR + "testcase01.pdf"));
    }

    @Test
    public void testNormalFile() {
        assertEquals("11111  \n", Answer.extractTextFromPdf(FIXTURE_DIR + "testcase02.pdf"));
    }

    @Test
    public void testMoreTextFile() {
        assertEquals("11111  \n22222  \n33333  \n44444  \n", Answer.extractTextFromPdf(FIXTURE_DIR + "testcase03.pdf"));
    }

    @Test
    public void testFilePathWithSpaces() throws Exception {
        Path pdfPath = Files.createTempFile("pdf text ", " fixture.pdf");
        try {
            Files.copy(new File(FIXTURE_DIR + "testcase02.pdf").toPath(), pdfPath, StandardCopyOption.REPLACE_EXISTING);
            assertEquals("11111  \n", Answer.extractTextFromPdf(pdfPath.toString()));
        } finally {
            Files.deleteIfExists(pdfPath);
        }
    }

    @Test(expected = IllegalArgumentException.class)
    public void testMissingFileThrows() {
        Answer.extractTextFromPdf(FIXTURE_DIR + "missing.pdf");
    }
}
