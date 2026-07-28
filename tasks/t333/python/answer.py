
from typing import Union, List, Tuple


def prob(self, context: Union[List[str], Tuple[str, ...]], word: str) -> float:
    """
    Calculate the probability of a word given a context using simplified n-gram model.

    This is a simplified version that removes backoff and complex smoothing mechanisms.
    It computes probability using maximum likelihood estimation: P(word|context) = count(context+word) / count(context)

    Args:
        context: A list or tuple of context words (previous words)
        word: The target word to calculate probability for

    Returns:
        float: Probability of the word given the context, ranging from 0.0 to 1.0
    """
    # Process context: convert to tuple and limit length to at most n-1
    context = tuple(context)
    if len(context) > self.n - 1:
        context = context[-(self.n - 1):]  # Keep only the most recent n-1 words

    # Get co-occurrence count of context+word and total count of context
    count_hw = self.ngram_counts[len(context)].get(context, {}).get(word, 0)
    total = self._get_total_count(context)  # Total occurrences of this context

    # Simplified probability calculation: direct count ratio
    if total == 0:
        return 0.0  # Context never occurred, return 0 probability
    return count_hw / total  # Maximum likelihood estimate: co-occurrence count / context total count