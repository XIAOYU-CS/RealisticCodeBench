describe('checkEmail', () => {
    test('basic email detection', () => {
        expect(checkEmail("Contact us at support@example.com")).toBe(true);
        expect(checkEmail("Send email to user@domain.org")).toBe(true);
        expect(checkEmail("No emails here!")).toBe(false);
        expect(checkEmail("")).toBe(false);
    });

    test('return matches functionality', () => {
        const text = "Emails: support@example.com and admin@site.org";
        const expected: string[] = ['support@example.com', 'admin@site.org'];
        const result = checkEmail(text, { returnMatches: true });
        expect(result).toEqual(expected);

        const resultEmpty = checkEmail("No emails here!", { returnMatches: true });
        expect(resultEmpty).toEqual([]);
    });

    test('unique flag deduplication', () => {
        const text = "Email user@example.com, then user@example.com again, and admin@site.org, user@example.com";
        const expected: string[] = ['user@example.com', 'admin@site.org'];
        const result = checkEmail(text, { returnMatches: true, unique: true });
        expect(result).toEqual(expected);
    });

    test('strict mode handling', () => {
        const textWithIp = "Email: user@192.168.1.1";
        expect(checkEmail(textWithIp, { strict: true })).toBe(false);
        expect(checkEmail(textWithIp, { strict: false })).toBe(true);
    });


    test('type error handling', () => {
        // @ts-ignore: Testing runtime type checking
        expect(() => checkEmail(123 as any)).toThrow(TypeError);
        // @ts-ignore: Testing runtime type checking
        expect(() => checkEmail(null as any)).toThrow(TypeError);
        // @ts-ignore: Testing runtime type checking
        expect(() => checkEmail(['not', 'a', 'string'] as any)).toThrow(TypeError);
    });
});