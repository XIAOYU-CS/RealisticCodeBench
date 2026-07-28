describe('shuffleStringCharacters', () => {
    test('should return a string of the same length as the input', () => {
        const input = "abcdef";
        const result = shuffleStringCharacters(input);
        expect(result.length).toBe(input.length);
    });

    test('should shuffle the characters in the string', () => {
        const input = "hello";
        const result = shuffleStringCharacters(input);
        expect(result).not.toBe(input);
    });

    test('should return an empty string when given an empty string', () => {
        const input = "";
        const result = shuffleStringCharacters(input);
        expect(result).toBe("");
    });

    test('should handle a single character string', () => {
        const input = "a";
        const result = shuffleStringCharacters(input);
        expect(result).toBe("a");
    });

    test('should handle strings with identical characters', () => {
        const input = "aaaaa";
        const result = shuffleStringCharacters(input);
        expect(result).toBe("aaaaa");
    });

    test('should return a shuffled string for longer strings', () => {
        const input = "abcdefghijklmnopqrstuvwxyz";
        const result = shuffleStringCharacters(input);
        expect(result).not.toBe(input);
        expect(result.length).toBe(input.length);
    });

    test('should return the same string if all characters are the same', () => {
        const input = "111111";
        const result = shuffleStringCharacters(input);
        expect(result).toBe("111111");
    });

    test('should shuffle a string containing special characters', () => {
        const input = "a!@#$%^&*()_+";
        const result = shuffleStringCharacters(input);
        expect(result.length).toBe(input.length);
        expect(result).not.toBe(input);
    });
});