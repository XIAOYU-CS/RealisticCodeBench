package org.real.temp;

import java.util.List;

public class Answer {
    /**
     * Processes path strings to generate simplified names, supporting custom rules while preserving default behavior
     *
     * @param path           Input path string
     * @param sep            Separator in the path (default '/')
     * @param replaceChar    Character to replace separators with (default '_')
     * @param stripChars     Characters to strip from the start and end (default '_')
     * @param removeItems    List of keywords to remove (only processed if provided)
     * @param extraSuffixes  Additional suffixes to remove (only processed if provided)
     * @return Processed simplified name
     */
    public static String customFormatFilePath(
            String path,
            String sep,
            String replaceChar,
            String stripChars,
            List<String> removeItems,
            List<String> extraSuffixes
    ) {
        // Handle default values
        if (sep == null) sep = "/";
        if (replaceChar == null) replaceChar = "_";
        if (stripChars == null) stripChars = "_";

        // Replace separators
        String newPath = path.replace(sep, replaceChar);

        // Strip specified characters
        newPath = strip(newPath, stripChars);

        // Remove specified items
        if (removeItems != null) {
            for (String item : removeItems) {
                String toRemove = item + replaceChar;
                newPath = newPath.replace(toRemove, "");
            }
        }

        // Remove extra suffixes
        if (extraSuffixes != null) {
            for (String suffix : extraSuffixes) {
                newPath = newPath.replace(suffix, "");
            }
        }

        return newPath;
    }

    /**
     * Helper method to strip characters from both ends of a string
     */
    private static String strip(String str, String stripChars) {
        if (str.isEmpty() || stripChars.isEmpty()) {
            return str;
        }

        int start = 0;
        int end = str.length() - 1;

        // Find start index
        while (start <= end && stripChars.indexOf(str.charAt(start)) != -1) {
            start++;
        }

        // Find end index
        while (end >= start && stripChars.indexOf(str.charAt(end)) != -1) {
            end--;
        }

        // Return substring or empty string if all characters were stripped
        return (start > end) ? "" : str.substring(start, end + 1);
    }

    // Overloaded method with default parameters
    public static String customFormatFilePath(String path) {
        return customFormatFilePath(path, "/", "_", "_", null, null);
    }

    public static String customFormatFilePath(String path, String sep, String replaceChar, String stripChars) {
        return customFormatFilePath(path, sep, replaceChar, stripChars, null, null);
    }

    public static String customFormatFilePath(String path, List<String> removeItems, List<String> extraSuffixes) {
        return customFormatFilePath(path, "/", "_", "_", removeItems, extraSuffixes);
    }

    public static String customFormatFilePath(String path, String stripChars, List<String> removeItems) {
        return customFormatFilePath(path, "/", "_", stripChars, removeItems, null);
    }
}
