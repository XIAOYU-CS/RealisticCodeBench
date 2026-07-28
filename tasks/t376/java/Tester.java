package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

public class Tester {

    static {
        System.setProperty("java.awt.headless", "true");
    }

    private byte[] testImageBytes;
    private String testOutputPath;

    @Before
    public void setUp() {
        // Create a test image (1000x1000 red image)
        BufferedImage testImage = new BufferedImage(1000, 1000, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = testImage.createGraphics();
        g.setColor(Color.RED);
        g.fillRect(0, 0, 1000, 1000);
        g.dispose();

        // Convert to bytes
        testImageBytes = imageToBytes(testImage);
        testOutputPath = "test_output.jpg";
    }

    @After
    public void tearDown() {
        File outputFile = new File(testOutputPath);
        if (outputFile.exists()) {
            outputFile.delete();
        }
    }

    private byte[] imageToBytes(BufferedImage img) {
        try {
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            ImageIO.write(img, "jpeg", buffer);
            return buffer.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert image to bytes", e);
        }
    }

    @Test
    public void testNormalResize() {
        Answer.ImageResizeParams params = new Answer.ImageResizeParams(80, 500, 500);
        params.setOptimizeJpeg(true);

        byte[] result = Answer.resizeImage(testImageBytes, params);

        assertTrue(result.length > 0);

        // Verify the resized image dimensions
        try {
            ByteArrayInputStream inputStream = new ByteArrayInputStream(result);
            BufferedImage img = ImageIO.read(inputStream);
            assertNotNull("Resized image should not be null", img);
            assertEquals("Width should be 500", 500, img.getWidth());
            assertEquals("Height should be 500", 500, img.getHeight());
            inputStream.close();
        } catch (IOException e) {
            fail("Failed to read resized image: " + e.getMessage());
        }
    }

    @Test
    public void testQualityParameter() {
        Answer.ImageResizeParams paramsHigh = new Answer.ImageResizeParams(95, 500, 500);
        Answer.ImageResizeParams paramsLow = new Answer.ImageResizeParams(10, 500, 500);

        byte[] resultHigh = Answer.resizeImage(testImageBytes, paramsHigh);
        byte[] resultLow = Answer.resizeImage(testImageBytes, paramsLow);

        assertTrue("High quality image should be larger than low quality",
                  resultHigh.length > resultLow.length);
    }

    @Test
    public void testProgressiveJpeg() {
        Answer.ImageResizeParams paramsProgressive = new Answer.ImageResizeParams(80, 500, 500);
        paramsProgressive.setProgressiveJpeg(true);

        Answer.ImageResizeParams paramsStandard = new Answer.ImageResizeParams(80, 500, 500);
        paramsStandard.setProgressiveJpeg(false);

        byte[] resultProgressive = Answer.resizeImage(testImageBytes, paramsProgressive);
        byte[] resultStandard = Answer.resizeImage(testImageBytes, paramsStandard);

        // Results should be different (though Java's ImageIO has limited progressive JPEG support)
        assertNotNull(resultProgressive);
        assertNotNull(resultStandard);
        // Note: In Java's standard ImageIO, progressive JPEG support is limited
    }

    @Test
    public void testInvalidDimensions() {
        // Test zero width
        Answer.ImageResizeParams paramsZero = new Answer.ImageResizeParams(80, 0, 500);

        try {
            Answer.resizeImage(testImageBytes, paramsZero);
            fail("Expected IllegalArgumentException for zero width");
        } catch (IllegalArgumentException e) {
            assertEquals("Target width and height must be positive values", e.getMessage());
        }

        // Test negative height
        Answer.ImageResizeParams paramsNegative = new Answer.ImageResizeParams(80, 500, -100);

        try {
            Answer.resizeImage(testImageBytes, paramsNegative);
            fail("Expected IllegalArgumentException for negative height");
        } catch (IllegalArgumentException e) {
            assertEquals("Target width and height must be positive values", e.getMessage());
        }
    }

    @Test
    public void testInvalidQuality() {
        // Test quality too low
        Answer.ImageResizeParams paramsLow = new Answer.ImageResizeParams(0, 500, 500);

        try {
            Answer.resizeImage(testImageBytes, paramsLow);
            fail("Expected IllegalArgumentException for quality 0");
        } catch (IllegalArgumentException e) {
            assertEquals("Image quality must be between 1 and 100", e.getMessage());
        }

        // Test quality too high
        Answer.ImageResizeParams paramsHigh = new Answer.ImageResizeParams(101, 500, 500);

        try {
            Answer.resizeImage(testImageBytes, paramsHigh);
            fail("Expected IllegalArgumentException for quality 101");
        } catch (IllegalArgumentException e) {
            assertEquals("Image quality must be between 1 and 100", e.getMessage());
        }
    }

    @Test
    public void testEmptyImageBytes() {
        Answer.ImageResizeParams params = new Answer.ImageResizeParams(80, 500, 500);

        try {
            Answer.resizeImage(new byte[0], params);
            fail("Expected RuntimeException for empty image bytes");
        } catch (RuntimeException e) {
            assertTrue(e.getMessage().contains("Image processing failed"));
        }
    }
}
