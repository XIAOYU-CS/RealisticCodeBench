describe('formatCommentWithCustomStyle', () => {
    test('hash style with line prefix', () => {
        const inputText = "This is a test comment that should be wrapped to multiple lines";
        const result = formatCommentWithCustomStyle(inputText, 30, "hash", "[INFO] ");
        const expected = "# [INFO] This is a test\n# [INFO] comment that should\n# [INFO] be wrapped to\n# [INFO] multiple lines";
        expect(result).toBe(expected);
    });

    test('slash style simple comment', () => {
        const inputText = "Simple single line comment";
        const result = formatCommentWithCustomStyle(inputText, 50, "slash");
        const expected = "// Simple single line comment";
        expect(result).toBe(expected);
    });

    test('block style multiline comment', () => {
        const inputText = "This is a block comment that spans multiple lines and should be properly formatted";
        const result = formatCommentWithCustomStyle(inputText, 40, "block");
        const expected = "/*\n* This is a block comment that spans\n* multiple lines and should be properly\n* formatted\n*/";
        expect(result).toBe(expected);
    });

    test('multiline input with word wrapping', () => {
        const inputText = "First line of text\nSecond line with more words to wrap";
        const result = formatCommentWithCustomStyle(inputText, 25, "hash");
        const expected = "# First line of text\n# Second line with more\n# words to wrap";
        expect(result).toBe(expected);
    });

    test('irregular whitespace collapses to single spaces', () => {
        const inputText = "Alpha   beta\tgamma\n\n delta";
        const result = formatCommentWithCustomStyle(inputText, 40, "hash");
        const expected = "# Alpha beta gamma delta";
        expect(result).toBe(expected);
    });
});
