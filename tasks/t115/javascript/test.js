describe('TestPascalTriangleRow', () => {
    it('test_row_0', () => {
        expect(pascalTriangleRow(0)).toEqual([1]);
    });

    it('test_row_1', () => {
        expect(pascalTriangleRow(1)).toEqual([1, 1]);
    });

    it('test_row_2', () => {
        expect(pascalTriangleRow(2)).toEqual([1, 2, 1]);
    });

    it('test_row_3', () => {
        expect(pascalTriangleRow(3)).toEqual([1, 3, 3, 1]);
    });

    it('test_row_4', () => {
        expect(pascalTriangleRow(4)).toEqual([1, 4, 6, 4, 1]);
    });

    it('test_row_5', () => {
        expect(pascalTriangleRow(5)).toEqual([1, 5, 10, 10, 5, 1]);
    });
});
