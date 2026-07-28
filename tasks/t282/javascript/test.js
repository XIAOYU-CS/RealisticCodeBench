describe("FindOrder Test Cases", () => {
    test("should return [2, 1] for 2 players", () => {
        expect(findOrder(2)).toEqual([2, 1]);
    });

    test("should return [2, 3, 1] for 3 players", () => {
        expect(findOrder(3)).toEqual([2, 3, 1]);
    });

    test("should return [2, 5, 3, 4, 1] for 5 players", () => {
        expect(findOrder(5)).toEqual([2, 5, 3, 4, 1]);
    });

    test("should return [2, 5, 4, 1, 6, 7, 3] for 7 players", () => {
        expect(findOrder(7)).toEqual([2, 5, 4, 1, 6, 7, 3]);
    });

    test("should return [2, 5, 10, 9, 7, 3, 4, 6, 8, 1] for 10 players", () => {
        expect(findOrder(10)).toEqual([2, 5, 10, 9, 7, 3, 4, 6, 8, 1]);
    });
});