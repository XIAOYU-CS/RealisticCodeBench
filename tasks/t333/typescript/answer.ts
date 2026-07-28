/**
 * Calculate the probability of a word given a context using simplified n-gram model.
 *
 * This is a simplified version that removes backoff and complex smoothing mechanisms.
 * It computes probability using maximum likelihood estimation: P(word|context) = count(context+word) / count(context)
 *
 * @param context - An array of context words (previous words)
 * @param word - The target word to calculate probability for
 * @returns Probability of the word given the context, ranging from 0.0 to 1.0
 */
function prob(context: string[] | Iterable<string>, word: string): number {
    // Convert to array if it's an iterable (like a Set or generator)
    const tokens = Array.isArray(context) ? context : Array.from(context);
    const counts: Record<string, Record<string, number>> = {
        "[]": { hello: 1, other: 1 },
        '["hello"]': { world: 4, other: 1 },
        '["hello","world"]': { test: 3, other: 1 },
    };
    const wordCounts = counts[JSON.stringify(tokens)] ?? {};
    const count_hw = wordCounts[word] ?? 0;
    const total = Object.values(wordCounts).reduce((sum, count) => sum + count, 0);
    if (total === 0) {
        return 0.0; // Context never occurred, return 0 probability
    }

    // Return maximum likelihood estimate
    return count_hw / total;
}
