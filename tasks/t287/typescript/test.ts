describe("BubbleSort Test Cases", () => {
    test("should sort an already sorted array", () => {
        const arr1 = [1, 2, 3, 4, 5];
        bubbleSort(arr1);
        expect(arr1).toEqual([1, 2, 3, 4, 5]);
    });

    test("should sort a reverse sorted array", () => {
        const arr2 = [5, 4, 3, 2, 1];
        bubbleSort(arr2);
        expect(arr2).toEqual([1, 2, 3, 4, 5]);
    });

    test("should sort an array with duplicate elements", () => {
        const arr3 = [3, 1, 2, 3, 2];
        bubbleSort(arr3);
        expect(arr3).toEqual([1, 2, 2, 3, 3]);
    });

    test("should handle an array with a single element", () => {
        const arr4 = [1];
        bubbleSort(arr4);
        expect(arr4).toEqual([1]);
    });

    test("should handle an empty array", () => {
        const arr5: number[] = [];
        bubbleSort(arr5);
        expect(arr5).toEqual([]);
    });
});