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
function prob(context, word) {}