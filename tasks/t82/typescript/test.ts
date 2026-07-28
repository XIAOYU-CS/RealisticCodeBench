describe('TestCalculateTotalSeconds', () => {
    it('should calculate total seconds with full values provided', () => {
        const time = [1, 2, 3, 4];
        const expected = 93784;
        const result = calculateTotalSeconds(time);
        expect(result).toBe(expected);
    });

    it('should calculate total seconds with some values missing', () => {
        const time = [0, 2, 3];
        const expected = 7380;
        const result = calculateTotalSeconds(time);
        expect(result).toBe(expected);
    });

    it('should calculate total seconds with only seconds provided', () => {
        const time = [0, 0, 0, 7200];
        const expected = 7200;
        const result = calculateTotalSeconds(time);
        expect(result).toBe(expected);
    });

    it('should treat a single provided value as days', () => {
        const time = [7200];
        const expected = 622080000;
        const result = calculateTotalSeconds(time);
        expect(result).toBe(expected);
    });

    it('should calculate total seconds with no time values provided', () => {
        const time: number[] = [];
        const expected = 0;
        const result = calculateTotalSeconds(time);
        expect(result).toBe(expected);
    });
});
