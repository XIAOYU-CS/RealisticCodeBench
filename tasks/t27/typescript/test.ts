describe('TestChangeReferenceFrame', () => {
    let pointCloud;
    let refFramePoints;

    beforeEach(() => {
        pointCloud = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        refFramePoints = [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0]
        ];
    });

    test('identity transformation', () => {
        const result = transformPointCloudToReferenceFrame(pointCloud, refFramePoints);
        const expected = pointCloud.map(point => point.map(coord => coord - 0));
        expect(result).toEqual(expected);
    });

    test('translation', () => {
        const framePoints = [
            [1, 1, 1],
            [2, 1, 1],
            [1, 2, 1]
        ];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        const expected = [
            [-1, 0, 1],
            [2, 3, 4],
            [5, 6, 7]
        ];
        expect(result).toEqual(expected);
    });

    test('rotation', () => {
        const framePoints = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 1, 1]
        ];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        const expected = [
            [2, 3, 1],
            [5, 6, 4],
            [8, 9, 7]
        ];
        expect(result).toEqual(expected);
    });

    test('non-orthonormal frame', () => {
        const framePoints = [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
        ];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        const u = [1, 0, 0];
        const v = [0, 1, 0];
        const w = crossProduct(u, v);
        const rotationMatrix = [u, v, w];
        const expected = pointCloud.map(point => {
            return point.map((_, i) => point.reduce((sum, val, j) => sum + val * rotationMatrix[j][i], 0));
        });
        expect(result).toEqual(expected);
    });

    test('inverted frame', () => {
        const framePoints = [
            [0, 0, 0],
            [-1, 0, 0],
            [0, -1, 0]
        ];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        const expected = pointCloud.map(point => {
            return [
                -point[0],
                -point[1],
                point[2]
            ];
        });
        expect(result).toEqual(expected);
    });
});