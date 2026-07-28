package org.real.temp;

import java.util.ArrayList;
import java.util.List;

public class Answer {
    /**
     * Check whether each row in data satisfies multiple XOR constraints.
     *
     * @param data 2D list with shape (N, C), where N is the number of rows and C is the number of columns.
     * @param xorGroups List of lists. Each sublist contains column indices to XOR, e.g., [[0,3,6], [1,4,7], [2,5]].
     * @param targetValues List of integers. Target XOR result for each group, e.g., [0x6b, 0x76, 0x12].
     * @return List of Boolean. A boolean list of length N, indicating whether each row satisfies all XOR constraints.
     */
    public static List<Boolean> checkXorConstraints(List<List<Integer>> data,
                                                    List<List<Integer>> xorGroups,
                                                    List<Integer> targetValues) {
        if (data == null || data.isEmpty()) {
            return new ArrayList<>();
        }

        int nRows = data.size();
        List<Boolean> results = new ArrayList<>();

        // Initialize all results to true
        for (int i = 0; i < nRows; i++) {
            results.add(true);
        }

        // Process each XOR group
        for (int g = 0; g < xorGroups.size(); g++) {
            List<Integer> group = xorGroups.get(g);
            Integer target = targetValues.get(g);

            // Skip empty groups
            if (group == null || group.isEmpty()) {
                continue;
            }

            // Compute XOR result for each row
            for (int r = 0; r < nRows; r++) {
                if (!results.get(r)) {
                    // Skip rows that already failed previous constraints
                    continue;
                }
                List<Integer> row = data.get(r);
                int xorResult = 0;

                for (Integer colIdx : group) {
                    if (colIdx >= 0 && colIdx < row.size()) {
                        xorResult ^= row.get(colIdx).intValue();
                    }
                    // If index is out of bounds, we could throw an exception or treat as 0
                    // Here we silently ignore out-of-bounds (treat as 0), similar to how NumPy might behave with proper indexing
                }

                boolean constraintSatisfied = (xorResult == target);
                results.set(r, results.get(r) && constraintSatisfied);
            }
        }
        return results;
    }
}