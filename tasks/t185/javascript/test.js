describe('isValidUsername', () => {
    test('should return true for a valid username with letters, numbers, and underscores', () => {
        const result = isValidUsername('user_123');
        expect(result).toBe(true);
    });

    test('should return true for a valid username with only letters', () => {
        const result = isValidUsername('username');
        expect(result).toBe(true);
    });

    test('should return false for a username with special characters', () => {
        const result = isValidUsername('user-name');
        expect(result).toBe(false);
    });

    test('should return false for a username with spaces', () => {
        const result = isValidUsername('user name');
        expect(result).toBe(false);
    });

    test('should return true for a valid username with only numbers', () => {
        const result = isValidUsername('12345');
        expect(result).toBe(true);
    });
});