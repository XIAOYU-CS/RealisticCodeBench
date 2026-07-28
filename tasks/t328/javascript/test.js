describe('replaceByNearest', () => {
    test('basic functionality with default mask', () => {
        const someArr = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        const rms = [
            [1, 0, 3],
            [0, 5, 6],
            [7, 8, 9]
        ];

        const expected = [
            [1, 1, 3],
            [1, 5, 6],
            [7, 8, 9]
        ];

        const result = replaceByNearest(someArr, rms);
        expect(result).toEqual(expected);
    });

    test('custom mask function', () => {
        const someArr = [
            [10, 20, 30],
            [40, 50, 60],
            [70, 80, 90]
        ];
        const rms = [
            [1, -1, 3],
            [-1, 5, 6],
            [7, 8, 9]
        ];

        const maskFunc = (x) => x < 0;

        const expected = [
            [10, 10, 30],
            [10, 50, 60],
            [70, 80, 90]
        ];

        const result = replaceByNearest(someArr, rms, maskFunc);
        expect(result).toEqual(expected);
    });

    test('no replacement needed', () => {
        const someArr = [
            [1, 2, 3],
            [4, 5, 6]
        ];
        const rms = [
            [1, 2, 3],
            [4, 5, 6]
        ];

        const result = replaceByNearest(someArr, rms);
        expect(result).toEqual(someArr);
        expect(result).not.toBe(someArr);
    });

    test('all elements masked', () => {
        const someArr = [
            [0, 0],
            [0, 0]
        ];
        const rms = [
            [0, 0],
            [0, 0]
        ];

        const result = replaceByNearest(someArr, rms);
        expect(result).toEqual(someArr);
        expect(result).not.toBe(someArr);
    });

    test('empty array', () => {
        const someArr = [];
        const rms = [];

        const result = replaceByNearest(someArr, rms);
        expect(result).toEqual([]);
        expect(result.length).toBe(0);
    });

    test('shape mismatch raises error', () => {
        const someArr = [[1, 2], [3, 4]];
        const rms = [[1, 2, 3], [4, 5, 6]];

        expect(() => replaceByNearest(someArr, rms)).toThrow();
    });

    test('invalid mask function raises error', () => {
        const someArr = [[1, 2], [3, 4]];
        const rms = [[1, 2], [3, 4]];

        const invalidMaskFunc = (x) => x + 1; 

        expect(() => replaceByNearest(someArr, rms, invalidMaskFunc)).toThrow();
    });
});