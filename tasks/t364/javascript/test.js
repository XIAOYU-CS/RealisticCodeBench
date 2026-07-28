describe('enhancedTextProcessor', () => {
    test('basic alphanumeric filtering functionality', () => {
        const text = "Hello, World! 123";
        const result = enhancedTextProcessor(
            text,
            true,
            "upper",
            null
        );
        expect(result).toBe("HELLOWORLD123");
    });

    test('character replacement functionality', () => {
        const text = "Hello @World# 123";
        const replace_map = {'@': 'at', '#': 'hash'};
        const result = enhancedTextProcessor(
            text,
            true,
            "upper",
            replace_map
        );
        expect(result).toBe("HELLOATWORLDHASH123");
    });

    test('lowercase transformation', () => {
        const text = "Hello, World! 123";
        const result = enhancedTextProcessor(
            text,
            true,
            "lower",
            null
        );
        expect(result).toBe("helloworld123");
    });

    test('with alphanumeric filtering disabled', () => {
        const text = "Hello, World! 123";
        const result = enhancedTextProcessor(
            text,
            false,
            "upper",
            null
        );
        expect(result).toBe("HELLO, WORLD! 123");
    });

    test('complex scenario with replacement and filtering', () => {
        const text = "Email: user@domain.com #123";
        const replace_map = {'@': ' at ', '#': 'number '};
        const result = enhancedTextProcessor(
            text,
            true,
            "upper",
            replace_map
        );
        expect(result).toBe("EMAILUSERATDOMAINCOMNUMBER123");
    });
});