describe('TestNearestNonzero', () => {

    test('test_basic_functionality_with_default_mask', () => {
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

    test('test_custom_mask_function', () => {
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

    test('test_no_replacement_needed', () => {
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

    test('test_all_elements_masked', () => {
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

    test('test_empty_array', () => {
        const someArr = [];
        const rms = [];

        const result = replaceByNearest(someArr, rms);
        expect(result).toEqual([]);
        expect(result.length).toBe(0);
    });
});