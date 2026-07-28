describe('findPlaceholders', () => {
    test('should extract basic placeholders with various valid formats', () => {
        const text = "Hello {{ user.name }}, welcome to {{ site-url }} and {{ user_id }}!";
        const expected = ['user.name', 'site-url', 'user_id'];
        const result = findPlaceholders(text);
        expect(result).toEqual(expected);
    });

    test('should return full placeholder format with {{}} brackets when returnFull is true', () => {
        const text = "Hello {{ user.name }}, welcome to {{ site-url }}!";
        const expected = ['{{ user.name }}', '{{ site-url }}'];
        const result = findPlaceholders(text, false, true);
        expect(result).toEqual(expected);
    });

    test('should remove duplicate placeholders while preserving order when unique is true', () => {
        const text = "Hello {{ user }}, welcome {{ user }}! Your {{ role }} is {{ role }}.";
        const expected = ['user', 'role'];
        const result = findPlaceholders(text, true);
        expect(result).toEqual(expected);
    });

    test('should handle empty and whitespace-only placeholders correctly', () => {
        const text = "Valid: {{ user }}, Empty: {{   }}, Also empty: {{}}";
        const result1 = findPlaceholders(text);
        expect(result1).toEqual(['user']);
        const result2 = findPlaceholders(text, false, false, true);
        expect(result2).toEqual(['user', '', '']);
    });

    test('should throw TypeError for non-string input', () => {
        expect(() => findPlaceholders(123)).toThrow();

        expect(() => findPlaceholders(null)).toThrow();

        expect(() => findPlaceholders(['not', 'a', 'string'])).toThrow();
    });
});