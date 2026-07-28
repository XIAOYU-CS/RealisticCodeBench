package org.real.temp;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;

public class Answer {

    /**
     * Move one or more files or directories to a destination path.
     *
     * @param sources A single source path or a list of source paths to move
     * @param destination The destination path where files/directories will be moved
     * @param overwrite Whether to overwrite the destination if it already exists
     * @return A tuple containing two lists: success_list and fail_list
     * @throws NotADirectoryException If multiple sources are provided and the destination is not an existing directory
     * @throws FileAlreadyExistsException If the destination exists and overwrite is False in a single-source move
     */
    public static Tuple<List<String>, List<Tuple<String, String>>> mv(
            Object sources, String destination, boolean overwrite)
            throws NotADirectoryException, FileAlreadyExistsException {

        List<String> sourceList;
        if (sources instanceof String) {
            sourceList = Arrays.asList((String) sources);
        } else if (sources instanceof List) {
            sourceList = (List<String>) sources;
        } else {
            throw new IllegalArgumentException("Sources must be a String or List<String>");
        }

        List<String> successList = new ArrayList<>();
        List<Tuple<String, String>> failList = new ArrayList<>();

        Path destPath = Paths.get(destination);

        if (sourceList.size() > 1 && !Files.isDirectory(destPath)) {
            throw new NotADirectoryException(
                "When moving multiple sources, destination must be an existing directory: " + destination);
        }

        for (String source : sourceList) {
            Path sourcePath = Paths.get(source);

            if (!Files.exists(sourcePath)) {
                failList.add(new Tuple<>(source, "Source path does not exist"));
                continue;
            }

            Path finalDestPath;
            if (Files.isDirectory(destPath) && (sourceList.size() > 1 || Files.isDirectory(sourcePath))) {
                finalDestPath = destPath.resolve(sourcePath.getFileName());
            } else {
                finalDestPath = destPath;
            }

            if (Files.exists(finalDestPath)) {
                if (!overwrite) {
                    failList.add(new Tuple<>(source,
                        "Destination already exists and overwrite is disabled: " + finalDestPath.toString()));
                    continue;
                }
                try {
                    if (Files.isRegularFile(finalDestPath) || Files.isSymbolicLink(finalDestPath)) {
                        Files.delete(finalDestPath);
                    } else {
                        deleteRecursively(finalDestPath);
                    }
                } catch (IOException e) {
                    failList.add(new Tuple<>(source, "Failed to remove existing destination: " + e.getMessage()));
                    continue;
                }
            }

            try {
                Files.move(sourcePath, finalDestPath, StandardCopyOption.REPLACE_EXISTING);
                successList.add(source);
            } catch (IOException e) {
                failList.add(new Tuple<>(source, e.getMessage()));
            }
        }

        return new Tuple<>(successList, failList);
    }

    /**
     * Overloaded method with default overwrite = false
     */
    public static Tuple<List<String>, List<Tuple<String, String>>> mv(Object sources, String destination)
            throws NotADirectoryException, FileAlreadyExistsException {
        return mv(sources, destination, false);
    }

    /**
     * Helper method to recursively delete directories
     */
    private static void deleteRecursively(Path path) throws IOException {
        if (Files.isDirectory(path)) {
            try (DirectoryStream<Path> entries = Files.newDirectoryStream(path)) {
                for (Path entry : entries) {
                    deleteRecursively(entry);
                }
            }
        }
        Files.delete(path);
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

    /**
     * Custom exception classes to match Python behavior
     */
    public static class NotADirectoryException extends Exception {
        public NotADirectoryException(String message) {
            super(message);
        }
    }

    public static class FileAlreadyExistsException extends Exception {
        public FileAlreadyExistsException(String message) {
            super(message);
        }
    }
}
