jest.mock('debug', () => () => () => {});

describe('listEsStepPrime', () => {
    test('should move right with non-empty right tape', () => {
        const current = new ListES([1, 2], [3, 4], 0, 0);
        const trans = new Trans(1, 1, 5);

        const result = listEsStepPrime(trans, current);
        const expected = new ListES([5, 1, 2], [4], 3, 1);

        expect(result.equals(expected)).toBe(true);
    });

    test('should move right with empty right tape', () => {
        const current = new ListES([1], [], 0, 0);
        const trans = new Trans(2, 1, 2);

        const result = listEsStepPrime(trans, current);
        const expected = new ListES([2, 1], [], Σ0, 2);

        expect(result.equals(expected)).toBe(true);
    });

    test('should move left with non-empty left tape', () => {
        const current = new ListES([3, 4], [5], 0, 0);
        const trans = new Trans(3, -1, 6);

        const result = listEsStepPrime(trans, current);
        const expected = new ListES([4], [6, 5], 3, 3);

        expect(result.equals(expected)).toBe(true);
    });

    test('should move left with empty left tape', () => {
        const current = new ListES([], [7, 8], 0, 0);
        const trans = new Trans(4, -1, 9);

        const result = listEsStepPrime(trans, current);
        const expected = new ListES([], [9, 7, 8], Σ0, 4);

        expect(result.equals(expected)).toBe(true);
    });

    test('should not move and only update current symbol', () => {
        const current = new ListES([10], [11], 0, 0);
        const trans = new Trans(5, 0, 12);

        const result = listEsStepPrime(trans, current);
        const expected = new ListES([10], [11], 12, 5);

        expect(result.equals(expected)).toBe(true);
    });
});
