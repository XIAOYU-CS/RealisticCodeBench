package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import java.awt.Color;
import java.util.Arrays;
import java.util.List;

public class Tester {

    private File writeImage(BufferedImage image) throws Exception {
        File file = File.createTempFile("t73-", ".png");
        ImageIO.write(image, "png", file);
        file.deleteOnExit();
        return file;
    }

    @Test
    public void testAllWhiteImage() throws Exception {
        BufferedImage image = new BufferedImage(4, 4, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < 4; y++) {
            for (int x = 0; x < 4; x++) {
                image.setRGB(x, y, Color.WHITE.getRGB());
            }
        }

        List<Integer> bits = Answer.imageTo1bitBinaryList(writeImage(image).getAbsolutePath());
        assertEquals(Arrays.asList(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), bits);
    }

    @Test
    public void testAllBlackImage() throws Exception {
        BufferedImage image = new BufferedImage(4, 4, BufferedImage.TYPE_INT_RGB);

        List<Integer> bits = Answer.imageTo1bitBinaryList(writeImage(image).getAbsolutePath());
        assertEquals(Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), bits);
    }

    @Test
    public void testCheckerboardImage() throws Exception {
        BufferedImage image = new BufferedImage(4, 4, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < 4; y++) {
            for (int x = 0; x < 4; x++) {
                if ((x + y) % 2 == 0) {
                    image.setRGB(x, y, Color.WHITE.getRGB());
                }
            }
        }

        List<Integer> bits = Answer.imageTo1bitBinaryList(writeImage(image).getAbsolutePath());
        assertEquals(Arrays.asList(1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1), bits);
    }

    @Test
    public void testHorizontalStripesImage() throws Exception {
        BufferedImage image = new BufferedImage(4, 4, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < 4; y++) {
            for (int x = 0; x < 4; x++) {
                if (y % 2 == 0) {
                    image.setRGB(x, y, Color.WHITE.getRGB());
                }
            }
        }

        List<Integer> bits = Answer.imageTo1bitBinaryList(writeImage(image).getAbsolutePath());
        assertEquals(Arrays.asList(1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0), bits);
    }

    @Test
    public void testVerticalStripesImage() throws Exception {
        BufferedImage image = new BufferedImage(4, 4, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < 4; y++) {
            for (int x = 0; x < 4; x++) {
                if (x % 2 == 0) {
                    image.setRGB(x, y, Color.WHITE.getRGB());
                }
            }
        }

        List<Integer> bits = Answer.imageTo1bitBinaryList(writeImage(image).getAbsolutePath());
        assertEquals(Arrays.asList(1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0), bits);
    }

    @Test(expected = Exception.class)
    public void testimageTo1bitBinaryListWithInvalidPath() throws Exception {
        String invalidImagePath = "path/to/nonexistent/image.png";
        Answer.imageTo1bitBinaryList(invalidImagePath);
    }
}
