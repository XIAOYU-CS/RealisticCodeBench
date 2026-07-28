describe('shuffleStringCharacters', () => {
    test('should return a string of the same length as the input', () => {
        const input: string = "abcdef";
        const result: string = shuffleStringCharacters(input);
        expect(result.length).toBe(input.length);
    });

    test('should shuffle the characters in the string', () => {
        const input: string = "hello";
        const result: string = shuffleStringCharacters(input);
        expect(result).not.toBe(input);
    });

    test('should return an empty string when given an empty string', () => {
        const input: string = "";
        const result: string = shuffleStringCharacters(input);
        expect(result).toBe("");
    });

    test('should handle a single character string', () => {
        const input: string = "a";
        const result: string = shuffleStringCharacters(input);
        expect(result).toBe("a");
    });

    test('should handle strings with identical characters', () => {
        const input: string = "aaaaa";
        const result: string = shuffleStringCharacters(input);
        expect(result).toBe("aaaaa");
    });

    test('should return a shuffled string for longer strings', () => {
        const input: string = "abcdefghijklmnopqrstuvwxyz";
        const result: string = shuffleStringCharacters(input);
        expect(result).not.toBe(input);
        expect(result.length).toBe(input.length);
    });

    test('should return the same string if all characters are the same', () => {
        const input: string = "111111";
        const result: string = shuffleStringCharacters(input);
        expect(result).toBe("111111");
    });

    test('should shuffle a string containing special characters', () => {
        const input: string = "a!@#$%^&*()_+";
        const result: string = shuffleStringCharacters(input);
        expect(result.length).toBe(input.length);
        expect(result).not.toBe(input);
    });
});