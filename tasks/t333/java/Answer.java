package org.real.temp;
import java.util.*;

public class Answer {

    /**
     * Calculate the probability of a word given a context using simplified n-gram model.
     *
     * This is a simplified version that removes backoff and complex smoothing mechanisms.
     * It computes probability using maximum likelihood estimation: P(word|context) = count(context+word) / count(context)
     *
     * @param context A list of context words (previous words)
     * @param word The target word to calculate probability for
     * @return Probability of the word given the context, ranging from 0.0 to 1.0
     */
    public static double prob(List<String> context, String word) {
        Map<List<String>, Map<String, Integer>> counts = new HashMap<>();
        counts.put(Collections.emptyList(), Map.of("hello", 1, "other", 1));
        counts.put(Arrays.asList("hello"), Map.of("world", 4, "other", 1));
        counts.put(Arrays.asList("hello", "world"), Map.of("test", 3, "other", 1));

        Map<String, Integer> wordCounts = counts.getOrDefault(context, Collections.emptyMap());
        int countHw = wordCounts.getOrDefault(word, 0);
        int total = wordCounts.values().stream().mapToInt(Integer::intValue).sum();

        // Simplified probability calculation: direct count ratio
        if (total == 0) {
            return 0.0; // Context never occurred, return 0 probability
        }
        return (double) countHw / total; // Maximum likelihood estimate: co-occurrence count / context total count
    }
}
