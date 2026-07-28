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