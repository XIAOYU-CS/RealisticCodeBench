def calculate_phrase_probability(text, target_phrase, case_sensitive=False):
    """Calculate the probability of a phrase (consecutive word sequence) appearing in text

    Args:
        text (str): The input text to search in
        target_phrase (str): The phrase to search for
        case_sensitive (bool): Whether to perform case-sensitive matching. Defaults to False.

    Returns:
        float: The probability of phrase occurrence, calculated as:
               (number of times phrase appears) / (total possible positions for phrase)
               Returns 0.0 if text is empty, phrase is empty, or text is shorter than phrase
    """
    # Check for empty inputs
    if not text.strip() or not target_phrase.strip():
        return 0.0

    # Handle case sensitivity
    if not case_sensitive:
        text = text.lower()
        target_phrase = target_phrase.lower()

    # Split into word lists
    words = text.split()
    target_words = target_phrase.split()
    phrase_length = len(target_words)
    total_words = len(words)

    # If text is shorter than phrase, phrase cannot appear
    if total_words < phrase_length:
        return 0.0

    # Count phrase occurrences
    phrase_count = 0
    # Slide through all possible positions where phrase could appear
    for i in range(total_words - phrase_length + 1):
        # Check if words at current position match the target phrase
        if words[i:i + phrase_length] == target_words:
            phrase_count += 1

    # Calculate probability: occurrences / possible positions
    possible_positions = total_words - phrase_length + 1
    return phrase_count / possible_positions if possible_positions > 0 else 0.0