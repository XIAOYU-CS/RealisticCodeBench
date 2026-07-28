/**
 * Adds padding characters to a multi-line string, supporting multiple directions and custom padding content
 *
 * @param string - Input multi-line string
 * @param n - Padding quantity (padding length for each side)
 * @param char - Padding character (space by default), can use a single character or string
 * @param side - Padding direction
 * @returns The padded multi-line string
 */
function padString(
    string: string,
    n: number = 4,
    char: string = ' ',
    side: 'left' | 'right' | 'both' = 'left'
): string {
    if (typeof string !== 'string') {
        throw new TypeError(`Expected string type, received ${typeof string}`);
    }

    if (!string || n <= 0) {
        return string;
    }

    if (!char) {
        char = ' ';
    }

    const charLen = char.length;
    const repeat = Math.floor(n / charLen) + (n % charLen ? 1 : 0);
    const padding = char.repeat(repeat).substring(0, n); // Ensure padding length is exactly n

    const endsWithNewline = string.endsWith('\n');
    const lines = string.split(/\r?\n/);

    const processedLines = lines.map(line => {
        switch (side) {
            case 'left':
                return padding + line;
            case 'right':
                return line + padding;
            case 'both':
                return padding + line + padding;
            default:
                throw new Error(`Unsupported padding direction: ${side}, allowed values: 'left'/'right'/'both'`);
        }
    });

    const result = processedLines.join('\n');
    return result + (endsWithNewline ? '\n' : '');
}

// TEST CASE
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

    test('error handling: invalid inputs', () => {
        expect(() => padString(12345 as any)).toThrow(TypeError);
        expect(() => padString("hello", undefined, undefined, 'center' as any)).toThrow(Error);
    });
});