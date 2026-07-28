package org.real.temp;
public class Answer {
    public static String truncateFilenameWithEllipsis(String filename, int maxLength) {
        // Extract the file extension
        String extension = "";
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex != -1 && lastDotIndex < filename.length() - 1) {
            extension = filename.substring(lastDotIndex);
        }

        // Remove the extension from the filename for manipulation
        String basename = lastDotIndex != -1 ? filename.substring(0, lastDotIndex) : filename;

        // Compress the basename if it's longer than maxLength
        String compressedBasename;
        if (basename.length() > maxLength) {
            compressedBasename = basename.substring(0, maxLength) + "***";
        } else {
            compressedBasename = basename;
        }

        // Reattach the extension and return
        return compressedBasename + extension;
    }
}
