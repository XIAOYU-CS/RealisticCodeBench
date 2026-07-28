package org.real.temp;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    private File tempFile;
    private String filePath;

    @Before
    public void setUp() throws IOException {
        tempFile = File.createTempFile("test", ".bin");
        filePath = tempFile.getAbsolutePath();
        tempFile.deleteOnExit();
    }

    @After
    public void tearDown() {
        if (tempFile != null && tempFile.exists()) {
            tempFile.delete();
        }
    }

    @Test
    public void testNormalCaseWithIntegers() throws Exception {
        try (FileOutputStream fos = new FileOutputStream(tempFile);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {

            ByteBuffer buffer1 = ByteBuffer.allocate(8).order(ByteOrder.LITTLE_ENDIAN);
            buffer1.putInt(10).putInt(20);
            bos.write(buffer1.array());

            ByteBuffer buffer2 = ByteBuffer.allocate(8).order(ByteOrder.LITTLE_ENDIAN);
            buffer2.putInt(30).putInt(40);
            bos.write(buffer2.array());

            ByteBuffer buffer3 = ByteBuffer.allocate(8).order(ByteOrder.LITTLE_ENDIAN);
            buffer3.putInt(50).putInt(60);
            bos.write(buffer3.array());
        }

        Object[] frameSpec = {2, "<I"};
        List<List<Number>> frames = Answer.readBinaryFrames(filePath, frameSpec, false);

        assertEquals(3, frames.size());
        assertEquals(10L, frames.get(0).get(0).longValue());
        assertEquals(20L, frames.get(0).get(1).longValue());
        assertEquals(30L, frames.get(1).get(0).longValue());
        assertEquals(40L, frames.get(1).get(1).longValue());
        assertEquals(50L, frames.get(2).get(0).longValue());
        assertEquals(60L, frames.get(2).get(1).longValue());
    }

    @Test
    public void testNormalCaseWithFloats() throws Exception {
        try (FileOutputStream fos = new FileOutputStream(tempFile);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {

            ByteBuffer buffer1 = ByteBuffer.allocate(12).order(ByteOrder.BIG_ENDIAN);
            buffer1.putFloat(1.1f).putFloat(2.2f).putFloat(3.3f);
            bos.write(buffer1.array());

            ByteBuffer buffer2 = ByteBuffer.allocate(12).order(ByteOrder.BIG_ENDIAN);
            buffer2.putFloat(4.4f).putFloat(5.5f).putFloat(6.6f);
            bos.write(buffer2.array());
        }

        Object[] frameSpec = {3, ">f"};
        List<List<Number>> frames = Answer.readBinaryFrames(filePath, frameSpec, false);

        assertEquals(2, frames.size());
        assertEquals(1.1f, frames.get(0).get(0).floatValue(), 0.000001f);
        assertEquals(6.6f, frames.get(1).get(2).floatValue(), 0.000001f);
    }

    @Test
    public void testIncompleteFrameHandling() throws Exception {
        try (FileOutputStream fos = new FileOutputStream(tempFile);
             BufferedOutputStream bos = new BufferedOutputStream(fos)) {

            ByteBuffer buffer1 = ByteBuffer.allocate(8).order(ByteOrder.LITTLE_ENDIAN);
            buffer1.putFloat(1.0f).putFloat(2.0f);
            bos.write(buffer1.array());

            ByteBuffer buffer2 = ByteBuffer.allocate(4).order(ByteOrder.LITTLE_ENDIAN);
            buffer2.putFloat(3.0f);
            bos.write(buffer2.array());
        }

        Object[] frameSpec = {2, "<f"};

        List<List<Number>> frames = Answer.readBinaryFrames(filePath, frameSpec, false);
        assertEquals(1, frames.size());
        assertEquals(1.0f, frames.get(0).get(0).floatValue(), 0.000001f);

        List<List<Number>> framesIgnored = Answer.readBinaryFrames(filePath, frameSpec, true);
        assertEquals(1, framesIgnored.size());
    }

    @Test(expected = Answer.ValueError.class)
    public void testInvalidParametersNegativeElements() throws Exception {
        Object[] frameSpec = {-1, "<I"};
        Answer.readBinaryFrames(filePath, frameSpec, false);
    }

    @Test(expected = Answer.ValueError.class)
    public void testInvalidParametersInvalidFormat() throws Exception {
        Object[] frameSpec = {2, "invalid"};
        Answer.readBinaryFrames(filePath, frameSpec, false);
    }

    @Test(expected = FileNotFoundException.class)
    public void testFileNotFound() throws Exception {
        tempFile.delete();
        Object[] frameSpec = {2, "<I"};
        Answer.readBinaryFrames(filePath, frameSpec, false);
    }
}