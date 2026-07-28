describe('findPlaceholders', () => {
    test('should extract basic placeholders with various valid formats', () => {
        const text: string = "Hello {{ user.name }}, welcome to {{ site-url }} and {{ user_id }}!";
        const expected: string[] = ['user.name', 'site-url', 'user_id'];
        const result: string[] = findPlaceholders(text);
        expect(result).toEqual(expected);
    });

    test('should return full placeholder format with {{}} brackets when returnFull is true', () => {
        const text: string = "Hello {{ user.name }}, welcome to {{ site-url }}!";
        const expected: string[] = ['{{ user.name }}', '{{ site-url }}'];
        const result: string[] = findPlaceholders(text, false, true);
        expect(result).toEqual(expected);
    });

    test('should remove duplicate placeholders while preserving order when unique is true', () => {
        const text: string = "Hello {{ user }}, welcome {{ user }}! Your {{ role }} is {{ role }}.";
        const expected: string[] = ['user', 'role'];
        const result: string[] = findPlaceholders(text, true);
        expect(result).toEqual(expected);
    });

    test('should handle empty and whitespace-only placeholders correctly', () => {
        const text: string = "Valid: {{ user }}, Empty: {{   }}, Also empty: {{}}";
        const result1: string[] = findPlaceholders(text);
        expect(result1).toEqual(['user']);
        const result2: string[] = findPlaceholders(text, false, false, true);
        expect(result2).toEqual(['user', '', '']);
    });

    test('should throw TypeError for non-string input', () => {
        expect(() => findPlaceholders(123 as any)).toThrow();

        expect(() => findPlaceholders(null as any)).toThrow();

        expect(() => findPlaceholders(['not', 'a', 'string'] as any)).toThrow();
    });
});