/**
 * Calculates the conditional probability of a word given a context using a simplified n-gram model.
 *
 * This method uses maximum likelihood estimation (MLE):
 * P(word | context) = count(context + [word]) / count(context)
 *
 * Note: This is a simplified implementation that does not include backoff or advanced smoothing techniques.
 * If the context has never been observed in the training data, or the n-gram (context + word) does not exist,
 * the method returns 0.0.
 *
 * @param context the sequence of preceding words (as a {@code List<String>}); may be empty but not null
 * @param word    the target word for which to compute the conditional probability
 * @return        the probability P(word | context), a {@code double} value in the range [0.0, 1.0]
 */
public static double prob(List<String> context, String word);