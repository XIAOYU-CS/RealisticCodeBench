package org.real.temp;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import javax.imageio.stream.MemoryCacheImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Iterator;

public class Answer {

    public static class ImageResizeParams {
        public int quality;
        public int targetWidth;
        public int targetHeight;
        public boolean optimizeJpeg;
        public boolean progressiveJpeg;

        public ImageResizeParams(int quality, int targetWidth, int targetHeight) {
            this.quality = quality;
            this.targetWidth = targetWidth;
            this.targetHeight = targetHeight;
            this.optimizeJpeg = false;
            this.progressiveJpeg = false;
        }

        public ImageResizeParams(int quality, int[] targetSize) {
            this.quality = quality;
            this.targetWidth = targetSize[0];
            this.targetHeight = targetSize[1];
            this.optimizeJpeg = false;
            this.progressiveJpeg = false;
        }

        public void setOptimizeJpeg(boolean optimizeJpeg) {
            this.optimizeJpeg = optimizeJpeg;
        }

        public void setProgressiveJpeg(boolean progressiveJpeg) {
            this.progressiveJpeg = progressiveJpeg;
        }
    }

    /**
     * Resizes an image to specified dimensions and optimizes JPEG output
     *
     * @param imageBytes Input JPEG image as bytes
     * @param params ImageResizeParams object containing processing parameters
     * @return Processed image as JPEG bytes
     * @throws RuntimeException If image processing fails
     */
    public static byte[] resizeImage(byte[] imageBytes, ImageResizeParams params) {
        if (params.targetWidth <= 0 || params.targetHeight <= 0) {
            throw new IllegalArgumentException("Target width and height must be positive values");
        }

        if (params.quality < 1 || params.quality > 100) {
            throw new IllegalArgumentException("Image quality must be between 1 and 100");
        }

        try {
            // Read image from bytes
            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
            BufferedImage img = ImageIO.read(inputStream);
            inputStream.close();

            if (img == null) {
                throw new RuntimeException("Failed to read image data");
            }

            // Handle transparency - convert to RGB if needed
            BufferedImage processedImg;
            if (img.getType() == BufferedImage.TYPE_INT_ARGB ||
                img.getType() == BufferedImage.TYPE_4BYTE_ABGR) {
                processedImg = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_INT_RGB);
                Graphics2D g = processedImg.createGraphics();
                g.setColor(Color.WHITE);
                g.fillRect(0, 0, img.getWidth(), img.getHeight());
                g.drawImage(img, 0, 0, null);
                g.dispose();
            } else if (img.getType() != BufferedImage.TYPE_INT_RGB &&
                       img.getType() != BufferedImage.TYPE_BYTE_GRAY) {
                processedImg = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_INT_RGB);
                Graphics2D g = processedImg.createGraphics();
                g.drawImage(img, 0, 0, null);
                g.dispose();
            } else {
                processedImg = img;
            }

            // Print processing info (equivalent to Python print statements)
            System.out.print("\r" + " ".repeat(80) + "\r");
            System.out.print("Quality: " + params.quality + "% | Resizing to: " +
                           params.targetWidth + "x" + params.targetHeight + " " +
                           (params.optimizeJpeg ? "| Optimized" : "") +
                           (params.progressiveJpeg ? "| Progressive" : ""));
            System.out.flush();

            // Resize image using high-quality scaling
            Image scaledImage = img.getScaledInstance(params.targetWidth, params.targetHeight, Image.SCALE_SMOOTH);
            BufferedImage resizedImg = new BufferedImage(params.targetWidth, params.targetHeight, BufferedImage.TYPE_INT_RGB);
            Graphics2D g2d = resizedImg.createGraphics();
            g2d.drawImage(scaledImage, 0, 0, null);
            g2d.dispose();

            // Write image to bytes with JPEG parameters
            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
            if (!writers.hasNext()) {
                throw new RuntimeException("No JPEG writer available");
            }

            ImageWriter writer = writers.next();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageOutputStream ios = new MemoryCacheImageOutputStream(outputStream);
            writer.setOutput(ios);

            ImageWriteParam param = writer.getDefaultWriteParam();
            if (param.canWriteCompressed()) {
                param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                float quality = params.quality / 100.0f;
                param.setCompressionQuality(quality);
            }

            // Note: Java's ImageIO doesn't directly support progressive JPEG or optimize flags
            // These features would require additional libraries like TwelveMonkeys

            writer.write(null, new IIOImage(resizedImg, null, null), param);
            writer.dispose();
            ios.close();

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Image processing failed: " + e.getMessage(), e);
        }
    }
}
