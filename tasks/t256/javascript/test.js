describe('binarySearchClosest', () => {
    test('Target is present in the array', () => {
        const array = [1, 3, 5, 7, 9, 11];
        const target = 7;
        const result = binarySearchClosest(array, target);
        expect(result).toBe(3);
    });

    test('Closest element is smaller than target', () => {
        const array = [1, 3, 5, 7, 9, 11];
        const target = 6;
        const result = binarySearchClosest(array, target);
        expect(result).toBe(2);
    });

    test('Closest element is larger than target', () => {
        const array = [1, 3, 5, 7, 9, 11];
        const target = 8;
        const result = binarySearchClosest(array, target);
        expect(result).toBe(3);
    });

    test('Target is smaller than all elements', () => {
        const array = [1, 3, 5, 7, 9, 11];
        const target = 0;
        const result = binarySearchClosest(array, target);
        expect(result).toBe(0);
    });

    test('Target is larger than all elements', () => {
        const array = [1, 3, 5, 7, 9, 11];
        const target = 12;
        const result = binarySearchClosest(array, target);
        expect(result).toBe(5);
    });
});