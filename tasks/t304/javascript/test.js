describe('parseEmail', () => {
    test('valid standard email', () => {
        const email = "user@example.com";
        const result = parseEmail(email);
        expect(result).toEqual({
            "account": "user",
            "platform": "@example.com",
            "full_email": "user@example.com"
        });
    });

    test('valid email with special characters', () => {
        const email = "user.name+tag@sub.domain.co.uk";
        const result = parseEmail(email);
        expect(result).toEqual({
            "account": "user.name+tag",
            "platform": "@sub.domain.co.uk",
            "full_email": "user.name+tag@sub.domain.co.uk"
        });
    });

    test('invalid email missing @', () => {
        const email = "userexample.com";
        const result = parseEmail(email);
        expect(result).toBeNull();
    });

    test('invalid email with no domain', () => {
        const email = "user@";
        const result = parseEmail(email);
        expect(result).toBeNull();
    });

    test('non-string inputs', () => {
        expect(parseEmail(12345)).toBeNull();
        expect(parseEmail(null)).toBeNull();
        expect(parseEmail(["email@example.com"])).toBeNull();
    });
});