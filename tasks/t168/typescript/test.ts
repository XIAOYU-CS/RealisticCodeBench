describe('scaleArrayToRange function tests', () => {
    test('simple scaling', () => {
        const result = scaleArrayToRange([1, 2, 3, 4, 5], 1, 5, 10, 50);
        expect(result).toEqual([10, 20, 30, 40, 50]);
    });

    test('scaling with negative input range', () => {
        const result = scaleArrayToRange([-5, 0, 5], -5, 5, 0, 100);
        expect(result).toEqual([0, 50, 100]);
    });

    test('scaling with negative output range', () => {
        const result = scaleArrayToRange([0, 50, 100], 0, 100, -100, 100);
        expect(result).toEqual([-100, 0, 100]);
    });

    test('input array containing the same value', () => {
        const result = scaleArrayToRange([2, 2, 2], 1, 3, 0, 10);
        expect(result).toEqual([5, 5, 5]);
    });

    test('input value out of range should throw an error', () => {
        expect(() => {
            scaleArrayToRange([1, 2, 3, 6], 1, 5, 0, 10);
        }).toThrow();
    });
});