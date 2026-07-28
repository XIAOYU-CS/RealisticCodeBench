describe('processStringQuotes', () => {
    test('strip outer quotes only', () => {
        let result = processStringQuotes('"Hello World"', true, false, false);
        expect(result).toBe('Hello World');

        result = processStringQuotes("'Hello World'", true, false, false);
        expect(result).toBe('Hello World');
    });

    test('escape inner quotes', () => {
        const result = processStringQuotes('He said "Hello" to me', false, false, false);
        expect(result).toBe('He said \\"Hello\\" to me');
    });

    test('unescape inner quotes', () => {
        const result = processStringQuotes('"Hello \\"World\\""', true, true, true);
        expect(result).toBe('"Hello "World""');
    });

    test('escape and enclose', () => {
        const result = processStringQuotes('Hello "World"', false, false, true);
        expect(result).toBe('"Hello \\"World\\""');
    });

    test('strip without enclosing', () => {
        const result = processStringQuotes('"Hello"', true, true, false);
        expect(result).toBe('Hello');
    });
});