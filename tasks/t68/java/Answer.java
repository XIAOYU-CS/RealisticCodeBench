package org.real.temp;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class Answer {

    /**
     * Classify an array of file names according to their file extensions.
     *
     * @param fileNames List of file names (strings).
     * @return A map with file extensions as keys and lists of file names as values.
     */
    public static Map<String, List<String>> classifyFilesByExtension(String[] fileNames) {
        Map<String, List<String>> classifiedFiles = new HashMap<>();

        for (String file : fileNames) {
            int dotIndex = file.lastIndexOf('.');

            if (dotIndex >= 0 && dotIndex < file.length() - 1) {
                String ext = file.substring(dotIndex + 1).toLowerCase();

                List<String> fileList = classifiedFiles.getOrDefault(ext, new ArrayList<>());
                fileList.add(file);
                classifiedFiles.put(ext, fileList);
            }
        }

        return classifiedFiles;
    }

    public static void main(String[] args) {
        // Example usage
        String[] fileNames = {"file1.txt", "file2.TXT", "file3.jpg", "file4.png", "file5"};
        Map<String, List<String>> classifiedFiles = classifyFilesByExtension(fileNames);

        // Print the result
        for (Map.Entry<String, List<String>> entry : classifiedFiles.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
