describe('parseDurationStringToTimedelta', () => {
    it('should handle single unit days', () => {
        const result = parseDurationStringToTimedelta("5d");
        expect(result).toBe(5 * 24 * 60 * 60 * 1000);
    });

    it('should handle single unit hours', () => {
        const result = parseDurationStringToTimedelta("8h");
        expect(result).toBe(8 * 60 * 60 * 1000);
    });

    it('should handle single unit minutes', () => {
        const result = parseDurationStringToTimedelta("45m");
        expect(result).toBe(45 * 60 * 1000);
    });

    it('should handle single unit seconds', () => {
        const result = parseDurationStringToTimedelta("30s");
        expect(result).toBe(30 * 1000);
    });

    it('should handle complex mix of units', () => {
        const result = parseDurationStringToTimedelta("2d 20h 30m");
        expect(result).toBe((2 * 24 * 60 * 60 + 20 * 60 * 60 + 30 * 60) * 1000);
    });

    it('should handle no units', () => {
        const result = parseDurationStringToTimedelta("");
        expect(result).toBe(0);
    });
});
