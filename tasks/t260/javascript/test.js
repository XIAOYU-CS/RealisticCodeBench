describe('generateRandomString', () => {
    
    test('length', () => {
        const randomString = generateRandomString();
        expect(randomString.length).toBe(25);
    });

    test('contains upper case', () => {
        const randomString = generateRandomString();
        const hasUpperCase = [...randomString].some(char => char === char.toUpperCase() && char !== char.toLowerCase());
        expect(hasUpperCase).toBe(true);
    });

    test('contains lower case', () => {
        const randomString = generateRandomString();
        const hasLowerCase = [...randomString].some(char => char === char.toLowerCase() && char !== char.toUpperCase());
        expect(hasLowerCase).toBe(true);
    });

    test('randomness', () => {
        const string1 = generateRandomString();
        const string2 = generateRandomString();
        expect(string1).not.toBe(string2);
    });

    test('multiple generations', () => {
        const numTests = 100;
        let hasUpperCase = false;
        let hasLowerCase = false;

        for (let i = 0; i < numTests; i++) {
            const randomString = generateRandomString();
            hasUpperCase ||= [...randomString].some(char => char === char.toUpperCase() && char !== char.toLowerCase());
            hasLowerCase ||= [...randomString].some(char => char === char.toLowerCase() && char !== char.toUpperCase());
        }

        expect(hasUpperCase).toBe(true);
        expect(hasLowerCase).toBe(true);
    });

});