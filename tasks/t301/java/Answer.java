package org.real.temp;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.List;

/**
 * Contains static methods for reading binary frame data from files
 */
public class Answer {

    /**
     * Reads frame data from a binary file, supporting custom frame structures and data types
     *
     * @param filePath        Path to the binary file
     * @param frameSpec       Frame structure description array containing two elements:
     *                        - elementsPerFrame: Number of elements in each frame (Integer)
     *                        - dataFormat: Format string following struct module conventions
     *                        (e.g., "<I" for little-endian 32-bit unsigned integer)
     * @param ignoreIncomplete Whether to ignore incomplete frames (false will warn, true will silently ignore)
     * @return List of frames, where each frame is a list containing the specified number of elements
     * @throws ValueError      If invalid parameters are provided
     * @throws FileNotFoundException If the specified file does not exist
     * @throws IOException     If an error occurs while reading the file
     */
    public static List<List<Number>> readBinaryFrames(String filePath, Object[] frameSpec, boolean ignoreIncomplete)
            throws ValueError, FileNotFoundException, IOException {

        int elementsPerFrame = (Integer) frameSpec[0];
        String dataFormat = (String) frameSpec[1];

        if (elementsPerFrame <= 0) {
            throw new ValueError("Number of elements per frame must be positive, got " + elementsPerFrame);
        }

        int elementSize;
        try {
            elementSize = calculateElementSize(dataFormat);
        } catch (IllegalArgumentException e) {
            throw new ValueError("Invalid data format string: " + dataFormat + ", error: " + e.getMessage());
        }

        int frameSize = elementsPerFrame * elementSize;
        if (frameSize <= 0) {
            throw new ValueError("Calculated frame size is invalid: " + frameSize + " bytes");
        }

        List<List<Number>> frames = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(filePath);
             BufferedInputStream bis = new BufferedInputStream(fis)) {

            byte[] chunk = new byte[frameSize];
            int bytesRead;

            while ((bytesRead = bis.read(chunk)) != -1) {
                if (bytesRead != frameSize) {
                    String msg = String.format("File %s contains incomplete frame, expected %d bytes, " +
                            "got %d bytes, which has been ignored", filePath, frameSize, bytesRead);

                    if (!ignoreIncomplete) {
                        System.err.println("Warning: " + msg);
                    }
                    break;
                }

                List<Number> frame = new ArrayList<>(elementsPerFrame);
                ByteBuffer buffer = ByteBuffer.wrap(chunk);

                if (dataFormat.startsWith("<")) {
                    buffer.order(ByteOrder.LITTLE_ENDIAN);
                } else if (dataFormat.startsWith(">")) {
                    buffer.order(ByteOrder.BIG_ENDIAN);
                } else {
                    buffer.order(ByteOrder.nativeOrder());
                }

                char type = dataFormat.charAt(dataFormat.startsWith("<") || dataFormat.startsWith(">") ? 1 : 0);

                for (int i = 0; i < elementsPerFrame; i++) {
                    Number element = parseElement(buffer, type);
                    frame.add(element);
                }

                frames.add(frame);
            }

        } catch (FileNotFoundException e) {
            throw new FileNotFoundException("File not found: " + filePath);
        } catch (IOException e) {
            throw new IOException("Failed to read file " + filePath + ": " + e.getMessage());
        }

        return frames;
    }

    /**
     * Calculates the size of a single element based on the format string.
     * Validates format string structure first (must be 1 or 2 characters long).
     *
     * @param dataFormat The format string specifying the data type
     * @return The size in bytes of one element
     * @throws IllegalArgumentException If the format string is invalid (structure or type)
     */
    private static int calculateElementSize(String dataFormat) {
        if (dataFormat == null || dataFormat.isEmpty()) {
            throw new IllegalArgumentException("Data format string cannot be empty");
        }
        if (dataFormat.length() > 2) {
            throw new IllegalArgumentException("Data format string is too long (max 2 characters)");
        }

        char type;
        if (dataFormat.length() == 2) {
            char prefix = dataFormat.charAt(0);
            if (prefix != '<' && prefix != '>') {
                throw new IllegalArgumentException("Invalid prefix in format string. Use '<' (little-endian) or '>' (big-endian)");
            }
            type = dataFormat.charAt(1);
        }
        else {
            type = dataFormat.charAt(0);
        }

        switch (type) {
            case 'b': case 'B': return 1;  // byte/unsigned byte
            case 'h': case 'H': return 2;  // short/unsigned short
            case 'i': case 'I': return 4;  // int/unsigned int
            case 'l': case 'L': return 4;  // long/unsigned long (4 bytes)
            case 'f': return 4;            // float
            case 'd': return 8;            // double
            default:
                throw new IllegalArgumentException("Unsupported data type: '" + type + "'. Valid types: b/B, h/H, i/I, l/L, f, d");
        }
    }

    /**
     * Parses a single element from the byte buffer based on the type specifier
     *
     * @param buffer The byte buffer containing the data
     * @param type The type specifier character
     * @return The parsed element as a Number
     * @throws IllegalArgumentException If the type is unsupported (should be caught earlier)
     */
    private static Number parseElement(ByteBuffer buffer, char type) {
        switch (type) {
            case 'b': return buffer.get();
            case 'B': return buffer.get() & 0xFF;  // Convert to unsigned (0-255)
            case 'h': return buffer.getShort();
            case 'H': return buffer.getShort() & 0xFFFF;  // Convert to unsigned (0-65535)
            case 'i': return buffer.getInt();
            case 'I': return buffer.getInt() & 0xFFFFFFFFL;  // Convert to unsigned long (0-4294967295)
            case 'l': return (long) buffer.getInt();  // 4-byte long (matches Python's struct 'l')
            case 'L': return (long)(buffer.getInt() & 0xFFFFFFFFL);  // Unsigned 4-byte long
            case 'f': return buffer.getFloat();
            case 'd': return buffer.getDouble();
            default:
                throw new IllegalArgumentException("Unsupported data type: " + type);
        }
    }

    /**
     * Custom exception class to represent value-related errors,
     * equivalent to Python's ValueError
     */
    public static class ValueError extends Exception {
        public ValueError(String message) {
            super(message);
        }
    }
}