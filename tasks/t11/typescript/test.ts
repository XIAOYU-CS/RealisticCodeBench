describe('extractPhoneNumbers', () => {
    test('should extract domestic US phone number formats', () => {
        const text = "Call me at 555-123-4567 or (555) 987-6543. Also try 1234567890.";
        const expected = ['555-123-4567', '(555) 987-6543', '1234567890'];
        const result = extractPhoneNumbers(text, false, false);

        expect(result).toHaveLength(3);
        expected.forEach(num => {
            expect(result).toContain(num);
        });
    });

    test('should extract international phone number formats', () => {
        const text = "International numbers: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678";
        const expected = ['+1-800-555-1234', '+44 20 7946 0853', '+86 138 1234 5678'];
        const result = extractPhoneNumbers(text);

        expect(result).toHaveLength(3);
        expected.forEach(num => {
            expect(result).toContain(num);
        });
    });
6
    test('should extract both domestic and international numbers from mixed text', () => {
        const text = "Contact: +1-800-555-1234, local: (555) 123-4567, UK: +44 20 7946 0853";
        const expected = ['+1-800-555-1234', '(555) 123-4567', '+44 20 7946 0853'];
        const result = extractPhoneNumbers(text);

        expect(result).toHaveLength(3);
        expected.forEach(num => {
            expect(result).toContain(num);
        });
    });

    test('should remove all separators when clean_format option is true', () => {
        const text = "Call +1-800-555-1234 or (555) 123-4567";
        const expected = ['18005551234', '5551234567'];
        const result = extractPhoneNumbers(text, true);

        expect(result).toHaveLength(2);
        expected.forEach(num => {
            expect(result).toContain(num);
        });
    });

    test('should remove duplicate phone numbers', () => {
        const text = "Same number: 555-123-4567, 555-123-4567, and +1-800-555-1234, +1-800-555-1234";
        const result = extractPhoneNumbers(text);

        // Should only have 2 unique numbers
        expect(result).toHaveLength(2);
        expect(result).toContain('555-123-4567');
        expect(result).toContain('+1-800-555-1234');
    });
});