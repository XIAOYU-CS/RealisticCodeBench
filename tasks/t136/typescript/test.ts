describe('TestcalculateMidpointsFromEdges', () => {
    it('test_basic_case', () => {
        const edges = [1, 2, 3, 4];
        const expectedMids = [1.5, 2.5, 3.5];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });

    it('test_single_interval', () => {
        const edges = [5, 10];
        const expectedMids = [7.5];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });

    it('test_multiple_intervals', () => {
        const edges = [0, 1, 2, 3, 4, 5];
        const expectedMids = [0.5, 1.5, 2.5, 3.5, 4.5];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });

    it('test_negative_edges', () => {
        const edges = [-5, -3, -1, 1];
        const expectedMids = [-4.0, -2.0, 0.0];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });

    it('test_zero_edges', () => {
        const edges = [0, 1, 2];
        const expectedMids = [0.5, 1.5];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });

    it('test_float_edges', () => {
        const edges = [0.0, 1.5, 3.0];
        const expectedMids = [0.75, 2.25];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });

    it('test_empty_array', () => {
        const edges = [];
        const expectedMids = [];
        expect(calculateMidpointsFromEdges(edges)).toEqual(expectedMids);
    });
});