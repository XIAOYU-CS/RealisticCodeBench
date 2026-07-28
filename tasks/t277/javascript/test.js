describe('Shell sort', () => {
    test('already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        shellSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    test('reverse sorted array', () => {
        const arr = [5, 4, 3, 2, 1];
        shellSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    test('array with duplicate elements', () => {
        const arr = [4, 2, 2, 4, 1];
        shellSort(arr);
        expect(arr).toEqual([1, 2, 2, 4, 4]);
    });

    test('array with negative numbers', () => {
        const arr = [-3, -1, -4, -2, 0];
        shellSort(arr);
        expect(arr).toEqual([-4, -3, -2, -1, 0]);
    });

    test('empty array', () => {
        const arr = [];
        shellSort(arr);
        expect(arr).toEqual([]);
    });
});
