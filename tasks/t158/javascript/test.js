describe('create36CharUuid', () => {

    test('should return a string', () => {
        const result = create36CharUuid();
        expect(typeof result).toBe('string');
    });

    test('should return a string of length 36', () => {
        const result = create36CharUuid();
        expect(result.length).toBe(36);
    });


    test('should generate different UUIDs on consecutive calls', () => {
        const uuid1 = create36CharUuid();
        const uuid2 = create36CharUuid();
        expect(uuid1).not.toBe(uuid2);
    });

    test('should generate UUIDs that include uppercase', () => {
        const result = create36CharUuid();
        expect(/[A-Z]/.test(result)).toBe(true);
    });
    test('should generate UUIDs that include  lowercase letters', () => {
        const result = create36CharUuid();
        expect(/[a-z]/.test(result)).toBe(true);
    });
    test('should generate UUIDs that include digits', () => {
        const result = create36CharUuid();
        expect(/[0-9]/.test(result)).toBe(true);
    });

});
