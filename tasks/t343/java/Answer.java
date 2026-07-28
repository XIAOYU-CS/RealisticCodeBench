package org.real.temp;

import java.util.*;

public class Answer {

    /**
     * Generate a specified number of random subsets
     *
     * @param start Start value of the integer range (inclusive)
     * @param stop End value of the integer range (exclusive)
     * @param size Number of elements in each subset
     * @param count Number of subsets to generate
     * @param step Step size between elements, default is 1 (consecutive integers)
     * @param allowDuplicates Whether to allow duplicate subsets, default is true
     * @param shuffle Whether to randomly shuffle elements within subsets, default is false
     * @param dataSource Optional data source list; if provided, elements will be selected from this list
     * @return A list containing multiple subsets
     */
    public static List<List<Object>> generateRandomSubsets(
            int start,
            int stop,
            int size,
            int count,
            int step,
            boolean allowDuplicates,
            boolean shuffle,
            List<Object> dataSource) {

        Random random = new Random();

        // Handle data source
        List<Object> population;
        if (dataSource != null) {
            population = new ArrayList<>(dataSource);
            if (population.size() < size) {
                throw new IllegalArgumentException("Length of data source is smaller than subset size");
            }
        } else {
            // Generate integer range
            population = new ArrayList<>();
            for (int i = start; i < stop; i += step) {
                population.add(i);
            }
            if (population.size() < size) {
                throw new IllegalArgumentException("Specified range cannot produce a subset of the required size");
            }
        }

        List<List<Object>> subsets = new ArrayList<>();
        int maxAttempts = count * 10; // Maximum number of attempts to prevent infinite loops
        int attempts = 0;

        while (subsets.size() < count && attempts < maxAttempts) {
            attempts++;
            List<Object> subset;

            // Select a continuous segment or random elements from the data source
            if (dataSource == null && step == 1) {
                // Maintain original logic: select a continuous segment
                int maxStartIdx = population.size() - size;
                int startIdx = random.nextInt(maxStartIdx + 1);
                subset = new ArrayList<>(population.subList(startIdx, startIdx + size));
            } else {
                // Randomly sample elements (possibly non-consecutive)
                subset = new ArrayList<>();
                List<Object> tempPopulation = new ArrayList<>(population);
                Collections.shuffle(tempPopulation, random);
                for (int i = 0; i < size; i++) {
                    subset.add(tempPopulation.get(i));
                }
            }

            // Handle sorting
            if (!shuffle && dataSource == null) {
                Collections.sort(subset, (a, b) -> {
                    if (a instanceof Integer && b instanceof Integer) {
                        return ((Integer) a).compareTo((Integer) b);
                    }
                    return a.toString().compareTo(b.toString());
                });
            }

            // Handle deduplication
            if (!allowDuplicates) {
                // Check if the subset already exists
                boolean exists = false;
                Set<Object> subsetSet = new HashSet<>(subset);
                for (List<Object> existing : subsets) {
                    if (new HashSet<>(existing).equals(subsetSet)) {
                        exists = true;
                        break;
                    }
                }
                if (exists) {
                    continue;
                }
            }

            subsets.add(new ArrayList<>(subset));
        }

        if (subsets.size() < count) {
            System.out.println("Could not generate enough unique subsets; only generated " + subsets.size());
        }

        return subsets;
    }
}