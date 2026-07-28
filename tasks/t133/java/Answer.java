package org.real.temp;

public class Answer {

    /**
     * Calculates the maximum width for each column in a given 2D list of strings.
     * 
     * @param data A 2D list of strings representing the table data.
     * @return A list of integers representing the maximum width for each column.
     */
    public static java.util.List<Integer> calculateMaxWidthsPerColumn(java.util.List<java.util.List<String>> data) {
        // Initialize a list to hold the maximum widths for each column.
        // Assumes all rows in data have the same number of columns.
        java.util.List<Integer> widths = new java.util.ArrayList<>();
        for (int idx = 0; idx < data.get(0).size(); idx++) {
            widths.add(0);
        }

        // Iterate over each row in the data.
        for (java.util.List<String> row : data) {
            // Iterate over each column in the row.
            for (int idx = 0; idx < row.size(); idx++) {
                // Update the width at index `idx` with the maximum of the current width
                // and the length of the string in the current column.
                widths.set(idx, Math.max(widths.get(idx), row.get(idx).length()));
            }
        }

        // Return the list of maximum widths for each column.
        return widths;
    }
}
