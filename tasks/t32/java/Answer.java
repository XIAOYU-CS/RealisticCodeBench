package org.real.temp;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Answer {

    /**
     * Finds common column headers across multiple CSV files in a given directory.
     * 
     * @param directoryPath the path to the directory containing CSV files
     * @return a list of common column names
     */
    public static List<String> findCommonColumns(String directoryPath) {
        File directory = new File(directoryPath);
        File[] files = directory.listFiles((dir, name) -> name.toLowerCase().endsWith(".csv"));
        
        if (files == null || files.length == 0) {
            return new ArrayList<>();
        }

        try {
            List<String> commonColumns = readHeader(files[0]);
            for (int i = 1; i < files.length; i++) {
                commonColumns.retainAll(readHeader(files[i]));
            }
            return commonColumns;
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private static List<String> readHeader(File file) throws IOException {
        List<String> lines = Files.readAllLines(file.toPath());
        if (lines.isEmpty()) {
            return new ArrayList<>();
        }
        return new ArrayList<>(Arrays.asList(lines.get(0).split(",")));
    }

    public static void main(String[] args) {
        // Example usage
        List<String> commonCols = findCommonColumns("path/to/directory");
        System.out.println(commonCols);
    }
}
