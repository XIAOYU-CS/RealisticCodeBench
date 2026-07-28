package org.real.temp;

import java.io.File;
import java.nio.file.*;
import java.util.*;
import java.text.SimpleDateFormat;
import java.util.stream.Collectors;

public class Answer {

    /**
     * List files and folders in the specified directory or current directory with sorting support
     *
     * @param directory Optional parameter, specifies the directory path to list. If null, lists current directory
     * @param sortBy Sorting method, options: "name" (by name), "size" (by size), "mtime" (by modification time)
     * @param reverse Whether to sort in reverse order, default false (ascending)
     * @return Tuple (boolean, String): First element indicates success, second element is the result string
     */
    public static Tuple<Boolean, String> commandLs(String directory, String sortBy, boolean reverse) {
        List<String> validSortOptions = Arrays.asList("name", "size", "mtime");
        if (sortBy == null || !validSortOptions.contains(sortBy)) {
            return new Tuple<>(false, "Invalid sort option. Must be one of: " + String.join(", ", validSortOptions));
        }

        try {
            // Process directory parameter
            String targetDir;
            if (directory == null) {
                targetDir = ".";
            } else {
                // Check if directory exists
                Path dirPath = Paths.get(directory);
                if (!Files.exists(dirPath) || !Files.isDirectory(dirPath)) {
                    return new Tuple<>(false, "[invalid directory path]");
                }
                targetDir = directory;
            }

            File dir = new File(targetDir);
            File[] files = dir.listFiles();

            if (files == null) {
                return new Tuple<>(false, "[invalid directory path]");
            }

            // Get directory contents and prepare detailed information
            List<EntryInfo> entries = new ArrayList<>();

            for (File file : files) {
                // Skip . and ..
                if (file.getName().equals(".") || file.getName().equals("..")) {
                    continue;
                }

                EntryInfo entry = new EntryInfo();
                entry.name = file.getName();
                entry.path = file.getAbsolutePath();
                entry.isDirectory = file.isDirectory();
                entry.size = file.length();
                entry.mtime = file.lastModified();

                entries.add(entry);
            }

            // Sort according to selected method
            switch (sortBy) {
                case "name":
                    entries.sort((a, b) -> {
                        int result = a.name.toLowerCase().compareTo(b.name.toLowerCase());
                        return reverse ? -result : result;
                    });
                    break;
                case "size":
                    entries.sort((a, b) -> {
                        // For directories, use 0 size for sorting consistency
                        long sizeA = a.isDirectory ? 0 : a.size;
                        long sizeB = b.isDirectory ? 0 : b.size;
                        int result = Long.compare(sizeA, sizeB);
                        return reverse ? -result : result;
                    });
                    break;
                case "mtime":
                    entries.sort((a, b) -> {
                        int result = Long.compare(a.mtime, b.mtime);
                        return reverse ? -result : result;
                    });
                    break;
            }

            // Prepare result buffer
            List<String> result = new ArrayList<>();

            for (EntryInfo item : entries) {
                if (item.isDirectory) {
                    // Directory entry
                    result.add(String.format("[DIR]                     %-50s", item.name));
                } else {
                    // File entry, display size
                    result.add(String.format("[FILE] %10d bytes   %-50s", item.size, item.name));
                }
            }

            // Combine results, add leading newline
            return new Tuple<>(true, "\n" + String.join("\n", result));

        } catch (Exception e) {
            return new Tuple<>(false, "Error: " + e.getMessage());
        }
    }

    /**
     * Overloaded method with default parameters
     */
    public static Tuple<Boolean, String> commandLs() {
        return commandLs(null, "name", false);
    }

    public static Tuple<Boolean, String> commandLs(String directory) {
        return commandLs(directory, "name", false);
    }

    public static Tuple<Boolean, String> commandLs(String directory, String sortBy) {
        return commandLs(directory, sortBy, false);
    }

    /**
     * Helper class to hold file/directory information
     */
    private static class EntryInfo {
        String name;
        String path;
        boolean isDirectory;
        long size;
        long mtime;
    }

    /**
     * Generic Tuple class to hold two values
     */
    public static class Tuple<T, U> {
        public final T first;
        public final U second;

        public Tuple(T first, U second) {
            this.first = first;
            this.second = second;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Tuple<?, ?> tuple = (Tuple<?, ?>) obj;
            return Objects.equals(first, tuple.first) && Objects.equals(second, tuple.second);
        }

        @Override
        public int hashCode() {
            return Objects.hash(first, second);
        }
    }
}
