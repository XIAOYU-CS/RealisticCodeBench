package org.real.temp;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class Answer {
    private static Charset normalizeEncoding(String encoding) {
        String normalized = encoding.replace("_", "").replace("-", "").toLowerCase();
        if (normalized.equals("utf16")) {
            return StandardCharsets.UTF_16;
        }
        if (normalized.equals("utf8")) {
            return StandardCharsets.UTF_8;
        }
        if (normalized.equals("cp932")) {
            return Charset.forName("MS932");
        }
        return Charset.forName(encoding);
    }

    /**
     * This method converts the encoding of a file from one encoding to another.
     *
     * @param inputFilePath      The path to the input file.
     * @param outputFilePath     The path to the output file where the converted content is saved.
     * @param originalEncoding   The original encoding of the file (default is "cp932").
     * @param targetEncoding     The target encoding to convert to (default is "UTF-16").
     * @return                   True if the conversion was successful, or if no conversion was needed; False otherwise.
     */
    public static boolean convertEncoding(String inputFilePath, String outputFilePath, String originalEncoding, String targetEncoding) {
        Path input = Paths.get(inputFilePath);
        Path output = Paths.get(outputFilePath);
        try {
            Charset sourceEncoding = normalizeEncoding(originalEncoding);
            Charset destinationEncoding = normalizeEncoding(targetEncoding);
            String content = Files.readString(input, sourceEncoding);
            Files.writeString(output, content, destinationEncoding);
            return true;
        } catch (Exception e) {
            try {
                Files.readString(input, normalizeEncoding(targetEncoding));
                Files.copy(input, output, StandardCopyOption.REPLACE_EXISTING);
                return true;
            } catch (Exception ignored) {
                return false;
            }
        }
    }

    public static void main(String[] args) {
        String inputFilePath = "path/to/input.txt";
        String outputFilePath = "path/to/output.txt";
        boolean success = convertEncoding(inputFilePath, outputFilePath, "cp932", "UTF-16");
        System.out.println("Conversion successful: " + success);
    }
}
