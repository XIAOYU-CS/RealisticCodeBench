describe('trilinearInterp', () => {
    let voxelMin, voxelMax, voxelValues;

    beforeEach(() => {
        voxelMin = [0, 0, 0];
        voxelMax = [2, 2, 2];
        voxelValues = [0, 2, 2, 4, 2, 4, 4, 6];
    });

    test('single point interpolation', () => {
        const point = [1, 1, 1];
        const result = trilinearInterp(point, voxelMin, voxelMax, voxelValues);

        const expected = 3.0;
        expect(result).toBeCloseTo(expected, 6);
        expect(typeof result).toBe('number');
    });

    test('batch points interpolation', () => {
        const batchPoints = [
            [0, 0, 0],
            [2, 2, 2],
            [1, 1, 1],
            [0, 1, 0.5]
        ];

        const result = trilinearInterp(batchPoints, voxelMin, voxelMax, voxelValues);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(4);

        expect(result[0]).toBeCloseTo(0.0, 6);
        expect(result[1]).toBeCloseTo(6.0, 6);
        expect(result[2]).toBeCloseTo(3.0, 6);
    });

    test('clip boundary mode', () => {
        const outOfBoundsPoint = [3, 1, 1];
        const result = trilinearInterp(
            outOfBoundsPoint,
            voxelMin,
            voxelMax,
            voxelValues,
            "clip"
        );

        const clippedPoint = [2, 1, 1];
        const expectedResult = trilinearInterp(clippedPoint, voxelMin, voxelMax, voxelValues);
        expect(result).toBeCloseTo(expectedResult, 6);
    });

    test('fill boundary mode', () => {
        const outOfBoundsPoint = [-1, 1, 1];
        const result = trilinearInterp(
            outOfBoundsPoint,
            voxelMin,
            voxelMax,
            voxelValues,
            "fill",
            -1.0
        );

        expect(result).toBeCloseTo(-1.0, 6);

        const batchPoints = [[1, 1, 1], [5, 1, 1], [0.5, 0.5, 0.5]];
        const resultBatch = trilinearInterp(
            batchPoints,
            voxelMin,
            voxelMax,
            voxelValues,
            "fill",
            -999.0
        );

        expect(resultBatch[1]).toBeCloseTo(-999.0, 6);
    });

    test('error boundary mode', () => {
        const outOfBoundsPoint = [3, 1, 1];

        expect(() => {
            trilinearInterp(
                outOfBoundsPoint,
                voxelMin,
                voxelMax,
                voxelValues,
                "error"
            );
        }).toThrow();
    });
});