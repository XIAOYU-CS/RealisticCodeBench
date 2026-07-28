describe('calculatePhraseProbability', () => {
    test('basic phrase match', () => {
        // Test basic phrase matching functionality
        const text = "the cat sat on the mat";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase);
        // Expected: 1 occurrence out of 5 possible positions = 0.2
        expect(result).toBe(0.2);
    });

    test('no match', () => {
        // Test when phrase doesn\'t appear in text
        const text = "the cat sat on the mat";
        const phrase = "dog house";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.0);
    });

    test('case insensitive match', () => {
        // Test case-insensitive matching (default behavior)
        const text = "The Cat Sat On The Mat";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase);
        // Should match regardless of case
        expect(result).toBe(0.2);
    });

    test('case sensitive match', () => {
        // Test case-sensitive matching
        const text = "The Cat Sat On The Mat";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase, true);
        // Should not match due to case difference
        expect(result).toBe(0.0);
    });

    test('empty inputs', () => {
        // Test handling of empty inputs
        // Test empty text
        expect(calculatePhraseProbability("", "test phrase")).toBe(0.0);

        // Test empty phrase
        expect(calculatePhraseProbability("test text", "")).toBe(0.0);

        // Test both empty
        expect(calculatePhraseProbability("", "")).toBe(0.0);

        // Test null/undefined inputs
        expect(calculatePhraseProbability(null, "test")).toBe(0.0);
        expect(calculatePhraseProbability("test", null)).toBe(0.0);
        expect(calculatePhraseProbability(undefined, "test")).toBe(0.0);
        expect(calculatePhraseProbability("test", undefined)).toBe(0.0);
    });

    test('text shorter than phrase', () => {
        // Test when text is shorter than target phrase
        const text = "short text";
        const phrase = "this is a very long phrase";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.0);
    });


    test('whitespace handling', () => {
        // Test handling of extra whitespace
        const text = "  the   cat   sat   on   the   mat  ";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.2);
    });
});