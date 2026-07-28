describe('TestconvertHolePositionsTo32bitRing', () => {
    it('test_no_holes', () => {
        const holes = [];
        const expected = new Array(32).fill(1);
        const result = convertHolePositionsTo32bitRing(holes);
        expect(result).toEqual(expected);
    });

    it('test_single_hole', () => {
        const holes = [5];
        const expected = new Array(32).fill(1);
        expected[5] = 0;
        const result = convertHolePositionsTo32bitRing(holes);
        expect(result).toEqual(expected);
    });

    it('test_multiple_holes', () => {
        const holes = [0, 2, 4, 8, 16];
        const expected = new Array(32).fill(1);
        holes.forEach(hole => {
            expected[hole] = 0;
        });
        const result = convertHolePositionsTo32bitRing(holes);
        expect(result).toEqual(expected);
    });

    it('test_hole_out_of_bounds', () => {
        const holes = [-1, 32, 5, 10];
        const expected = new Array(32).fill(1);
        expected[5] = 0;
        expected[10] = 0;
        const result = convertHolePositionsTo32bitRing(holes);
        expect(result).toEqual(expected);
    });

    it('test_all_holes', () => {
        const holes = Array.from({length: 32}, (_, i) => i);
        const expected = new Array(32).fill(0);
        const result = convertHolePositionsTo32bitRing(holes);
        expect(result).toEqual(expected);
    });
});