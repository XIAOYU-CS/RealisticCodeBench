describe('replaceUrlPlaceholders', () => {
    test('curly brace style replacement', () => {
        const url = "https://api.example.com/users/{user_id}/posts/{post_id}";
        const params = {"user_id": 123, "post_id": 456};
        const expected = "https://api.example.com/users/123/posts/456";
        const result = replaceUrlPlaceholders(url, params, 'curly');
        expect(result).toBe(expected);
    });

    test('colon style replacement with encoding', () => {
        const url = "https://api.example.com/search/:query";
        const params = {"query": "hello world & special chars"};
        const encodedValue = encodeURIComponent("hello world & special chars");
        const expected = `https://api.example.com/search/${encodedValue}`;
        const result = replaceUrlPlaceholders(url, params, 'colon', true);
        expect(result).toBe(expected);
    });

    test('square bracket style with numeric values', () => {
        const url = "https://api.example.com/data/[year]/[month]";
        const params = {"year": 2023, "month": 12};
        const expected = "https://api.example.com/data/2023/12";
        const result = replaceUrlPlaceholders(url, params, 'square');
        expect(result).toBe(expected);
    });

    test('unmatched placeholder warning', () => {
        const url = "https://api.example.com/users/{id}/posts/{post_id}";
        const params = {"id": 123}; // Missing post_id

        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

        const result = replaceUrlPlaceholders(url, params, 'curly');

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('URL contains unreplaced placeholders')
        );
        expect(result).toContain('123');
        expect(result).toContain('{post_id}');

        consoleSpy.mockRestore();
    });

    test('invalid style raises exception', () => {
        const url = "https://api.example.com/test";
        const params = {"test": "value"};
        expect(() => {
            replaceUrlPlaceholders(url, params, 'invalid_style' as any);
        }).toThrow();
    });

    test('alternative function with options object', () => {
        const url = "https://api.example.com/users/{user_id}";
        const params = {"user_id": 789};
        const expected = "https://api.example.com/users/789";
        const result = replaceUrlPlaceholders(url, params, 'curly');
        expect(result).toBe(expected);
    });

    test('default parameters work correctly', () => {
        const url = "https://api.example.com/users/{user_id}";
        const params = {"user_id": 789};
        const expected = "https://api.example.com/users/789";
        const result = replaceUrlPlaceholders(url, params);
        expect(result).toBe(expected);
    });
});