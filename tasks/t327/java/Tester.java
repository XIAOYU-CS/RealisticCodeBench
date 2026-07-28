package org.real.temp;

import org.junit.*;
import org.junit.rules.ExpectedException;
import org.junit.rules.TemporaryFolder;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.file.*;
import java.util.Arrays;

import static org.junit.Assert.*;

public class Tester {

    @Rule
    public TemporaryFolder tempFolder = new TemporaryFolder();

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void testReadCflFileWithHeader() throws Exception {
        /** Test reading .cfl file with corresponding .hdr header */
        // Create test data: 2x2x2 complex array
        float[] testData = {
            1.0f, 2.0f, 3.0f, 4.0f, 5.0f, 6.0f, 7.0f, 8.0f,
            9.0f, 10.0f, 11.0f, 12.0f, 13.0f, 14.0f, 15.0f, 16.0f
        }; // 8 complex numbers = 16 floats

        // Create .cfl file
        File cflFile = tempFolder.newFile("test_data.cfl");
        try (FileOutputStream fos = new FileOutputStream(cflFile)) {
            ByteBuffer buffer = ByteBuffer.allocate(testData.length * 4);
            buffer.order(ByteOrder.LITTLE_ENDIAN);
            for (float f : testData) {
                buffer.putFloat(f);
            }
            fos.write(buffer.array());
        }

        // Create .hdr file
        File hdrFile = tempFolder.newFile("test_data.hdr");
        try (PrintWriter writer = new PrintWriter(hdrFile)) {
            writer.println("# Dimensions");
            writer.println("2 2 2");  // 2x2x2 dimensions
        }

        // Read the file
        Answer.NDArray result = Answer.readArrayFile(cflFile.getAbsolutePath(), 5);

        // Verify the result
        assertNotNull(result);
        assertArrayEquals(new int[]{2, 2, 2, 1, 1}, result.getShape());
        assertEquals(16, result.getData().length); // 8 complex numbers = 16 floats
    }

    @Test
    public void testReadCflFileWithoutExtension() throws Exception {
        /** Test reading .cfl file specified without extension */
        // Create test data: 2x2 complex array
        float[] testData = {1.0f, 0.0f, 2.0f, 0.0f, 3.0f, 0.0f, 4.0f, 0.0f}; // 4 complex numbers

        // Create .cfl file
        File cflFile = tempFolder.newFile("test_no_ext.cfl");
        try (FileOutputStream fos = new FileOutputStream(cflFile)) {
            ByteBuffer buffer = ByteBuffer.allocate(testData.length * 4);
            buffer.order(ByteOrder.LITTLE_ENDIAN);
            for (float f : testData) {
                buffer.putFloat(f);
            }
            fos.write(buffer.array());
        }

        // Create .hdr file
        File hdrFile = tempFolder.newFile("test_no_ext.hdr");
        try (PrintWriter writer = new PrintWriter(hdrFile)) {
            writer.println("# Header");
            writer.println("2 2");  // 2x2 dimensions
        }

        // Read the file without extension (just the base name)
        String baseName = cflFile.getAbsolutePath().replace(".cfl", "");
        Answer.NDArray result = Answer.readArrayFile(baseName, 4);

        // Verify the result
        assertNotNull(result);
        assertArrayEquals(new int[]{2, 2, 1, 1}, result.getShape());
        assertEquals(8, result.getData().length); // 4 complex numbers = 8 floats
    }

    @Test
    public void testInvalidFileFormatRaisesError() throws Exception {
        /** Test that invalid file format raises appropriate error */
        // Create a file with unsupported extension
        File invalidFile = tempFolder.newFile("test_invalid.txt");
        try (PrintWriter writer = new PrintWriter(invalidFile)) {
            writer.println("This is not a valid array file");
        }

        // Verify that reading this file raises exception
        thrown.expect(Answer.ArrayFileException.class);
        thrown.expectMessage("Only .npy and .cfl format files are supported");

        Answer.readArrayFile(invalidFile.getAbsolutePath());
    }

    @Test
    public void testMissingHdrFileRaisesError() throws Exception {
        /** Test that missing .hdr file for .cfl raises appropriate error */
        // Create only .cfl file without .hdr
        File cflFile = tempFolder.newFile("missing_hdr.cfl");
        try (FileOutputStream fos = new FileOutputStream(cflFile)) {
            fos.write("dummy data".getBytes());
        }

        // Verify that reading this file raises exception
        thrown.expect(Answer.ArrayFileException.class);
        thrown.expectMessage("Missing header file");

        Answer.readArrayFile(cflFile.getAbsolutePath());
    }

    @Test
    public void testPreserveOriginalDimensions() throws Exception {
        /** Test reading .cfl file while preserving original dimensions */
        // Create test data: 2x3x4 complex array
        float[] testData = new float[2 * 3 * 4 * 2]; // 24 complex numbers = 48 floats
        for (int i = 0; i < testData.length; i++) {
            testData[i] = (float) i;
        }

        // Create .cfl file
        File cflFile = tempFolder.newFile("test_orig.cfl");
        try (FileOutputStream fos = new FileOutputStream(cflFile)) {
            ByteBuffer buffer = ByteBuffer.allocate(testData.length * 4);
            buffer.order(ByteOrder.LITTLE_ENDIAN);
            for (float f : testData) {
                buffer.putFloat(f);
            }
            fos.write(buffer.array());
        }

        // Create .hdr file
        File hdrFile = tempFolder.newFile("test_orig.hdr");
        try (PrintWriter writer = new PrintWriter(hdrFile)) {
            writer.println("# Dimensions");
            writer.println("2 3 4");  // 2x3x4 dimensions
        }

        // Read the file with targetDims=null
        Answer.NDArray result = Answer.readArrayFile(cflFile.getAbsolutePath(), null);

        // Verify the result preserves original dimensions
        assertNotNull(result);
        assertArrayEquals(new int[]{2, 3, 4}, result.getShape());
        assertEquals(48, result.getData().length);
    }

    @Test
    public void testTargetDimensionLessThanOriginalRaisesError() throws Exception {
        /** Test that target dimension less than original raises error */
        // Create test data: 3x3x3 complex array
        float[] testData = new float[3 * 3 * 3 * 2]; // 27 complex numbers
        for (int i = 0; i < testData.length; i++) {
            testData[i] = 1.0f;
        }

        // Create .cfl file
        File cflFile = tempFolder.newFile("test_small_target.cfl");
        try (FileOutputStream fos = new FileOutputStream(cflFile)) {
            ByteBuffer buffer = ByteBuffer.allocate(testData.length * 4);
            buffer.order(ByteOrder.LITTLE_ENDIAN);
            for (float f : testData) {
                buffer.putFloat(f);
            }
            fos.write(buffer.array());
        }

        // Create .hdr file
        File hdrFile = tempFolder.newFile("test_small_target.hdr");
        try (PrintWriter writer = new PrintWriter(hdrFile)) {
            writer.println("# Dimensions");
            writer.println("3 3 3");  // 3x3x3 dimensions
        }

        // Try to read with target dimension 2 (less than 3)
        thrown.expect(Answer.ArrayFileException.class);
        thrown.expectMessage("Target dimension(2) is less than original dimension(3)");

        Answer.readArrayFile(cflFile.getAbsolutePath(), 2);
    }

    @Test
    public void testEmptyCflFile() throws Exception {
        /** Test reading empty .cfl file */
        // Create empty .cfl file
        File cflFile = tempFolder.newFile("empty.cfl");

        // Create .hdr file with 0 dimensions
        File hdrFile = tempFolder.newFile("empty.hdr");
        try (PrintWriter writer = new PrintWriter(hdrFile)) {
            writer.println("# Dimensions");
            writer.println("");  // Empty dimensions
        }

        // This should handle gracefully or throw appropriate exception
        // For now, we expect it to throw due to parsing error
        thrown.expect(Answer.ArrayFileException.class);
        Answer.readArrayFile(cflFile.getAbsolutePath());
    }
}
