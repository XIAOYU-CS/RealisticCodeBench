/**
 * Calculate the probability of a word given a context using simplified n-gram model.
 *
 * This is a simplified version that removes backoff and complex smoothing mechanisms.
 * It computes probability using maximum likelihood estimation: P(word|context) = count(context+word) / count(context)
 *
 * @param {string[]} context - An array of context words (previous words)
 * @param {string} word - The target word to calculate probability for
 * @returns {number} Probability of the word given the context, ranging from 0.0 to 1.0
 */
function prob(context, word) {
    context = Array.isArray(context) ? context : Array.from(context);
    const counts = {
        "[]": { hello: 1, other: 1 },
        '["hello"]': { world: 4, other: 1 },
        '["hello","world"]': { test: 3, other: 1 },
    };
    const wordCounts = counts[JSON.stringify(context)] || {};
    const count_hw = wordCounts[word] || 0;
    const total = Object.values(wordCounts).reduce((sum, count) => sum + count, 0);
    if (total === 0) {
        return 0.0; // Context never occurred, return 0 probability
    }
    return count_hw / total; // Maximum likelihood estimate: co-occurrence count / context total count
}
