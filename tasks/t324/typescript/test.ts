describe('calculatePhraseProbability', () => {
    test('basic phrase match', () => {
        const text = "the cat sat on the mat";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.2);
    });

    test('no match', () => {
        const text = "the cat sat on the mat";
        const phrase = "dog house";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.0);
    });

    test('case insensitive match', () => {
        const text = "The Cat Sat On The Mat";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.2);
    });

    test('case sensitive match', () => {
        const text = "The Cat Sat On The Mat";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase, true);
        expect(result).toBe(0.0);
    });

    test('empty inputs', () => {
        expect(calculatePhraseProbability("", "test phrase")).toBe(0.0);
        expect(calculatePhraseProbability("test text", "")).toBe(0.0);
        expect(calculatePhraseProbability("", "")).toBe(0.0);
    });

    test('text shorter than phrase', () => {
        const text = "short text";
        const phrase = "this is a very long phrase";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.0);
    });

    test('whitespace handling', () => {
        const text = "  the   cat   sat   on   the   mat  ";
        const phrase = "the cat";
        const result = calculatePhraseProbability(text, phrase);
        expect(result).toBe(0.2);
    });
});