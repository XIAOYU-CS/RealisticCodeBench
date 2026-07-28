describe('padString', () => {
    test('left padding with default char', () => {
        const input = "hello\nworld";
        const expected = "    hello\n    world";
        expect(padString(input, 4)).toBe(expected);
    });

    test('right padding with custom char', () => {
        const input = "test";
        const expected = "test####";
        expect(padString(input, 4, '#', 'right')).toBe(expected);
    });

    test('both sides padding with string', () => {
        const input = "line1\nline2";
        const expected = "abline1ab\nabline2ab";
        expect(padString(input, 2, 'ab', 'both')).toBe(expected);
    });

    test('edge cases: empty string and zero padding', () => {
        expect(padString("")).toBe("");
        expect(padString("example", 0)).toBe("example");
        expect(padString("test", -3)).toBe("test");
    });

    test('error handling: invalid side', () => {
        expect(() => padString("hello", 4, ' ', 'center')).toThrow(Error);
    });
});
