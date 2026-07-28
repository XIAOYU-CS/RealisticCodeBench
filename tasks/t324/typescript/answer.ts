/**
 * Calculate the probability of a phrase (consecutive word sequence) appearing in text
 *
 * @param text - The input text to search in
 * @param targetPhrase - The phrase to search for
 * @param caseSensitive - Whether to perform case-sensitive matching. Defaults to false.
 * @returns The probability of phrase occurrence, calculated as:
 *          (number of times phrase appears) / (total possible positions for phrase)
 *          Returns 0.0 if text is empty, phrase is empty, or text is shorter than phrase
 */
function calculatePhraseProbability(
    text: string,
    targetPhrase: string,
    caseSensitive: boolean = false
): number {
    // Check for empty inputs
    if (!text || typeof text !== 'string' || !text.trim() ||
        !targetPhrase || typeof targetPhrase !== 'string' || !targetPhrase.trim()) {
        return 0.0;
    }

    // Handle case sensitivity
    if (!caseSensitive) {
        text = text.toLowerCase();
        targetPhrase = targetPhrase.toLowerCase();
    }

    // Split into word arrays
    const words: string[] = text.trim().split(/\s+/);
    const targetWords: string[] = targetPhrase.trim().split(/\s+/);
    const phraseLength: number = targetWords.length;
    const totalWords: number = words.length;

    // If text is shorter than phrase, phrase cannot appear
    if (totalWords < phraseLength) {
        return 0.0;
    }

    // Count phrase occurrences
    let phraseCount: number = 0;
    // Slide through all possible positions where phrase could appear
    for (let i: number = 0; i <= totalWords - phraseLength; i++) {
        // Check if words at current position match the target phrase
        let match: boolean = true;
        for (let j: number = 0; j < phraseLength; j++) {
            if (words[i + j] !== targetWords[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            phraseCount++;
        }
    }

    // Calculate probability: occurrences / possible positions
    const possiblePositions: number = totalWords - phraseLength + 1;
    return possiblePositions > 0 ? phraseCount / possiblePositions : 0.0;
}