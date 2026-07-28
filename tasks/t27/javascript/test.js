describe('TestChangeReferenceFrame', () => {
    let pointCloud;
    let refFramePoints;

    beforeEach(() => {
        pointCloud = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        refFramePoints = [[0, 0, 0], [1, 0, 0], [0, 1, 0]];
    });

    function arraysAlmostEqual(arr1, arr2, tolerance = 1e-5) {
        expect(arr1.length).toBe(arr2.length);
        arr1.forEach((row, i) => {
            expect(row.length).toBe(arr2[i].length);
            row.forEach((val, j) => {
                expect(Math.abs(val - arr2[i][j])).toBeLessThan(tolerance);
            });
        });
    }

    function subtract(a, b) {
        return a.map((value, index) => value - b[index]);
    }

    function cross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }

    function transpose(matrix) {
        return matrix[0].map((_, columnIndex) => matrix.map(row => row[columnIndex]));
    }

    function column(point) {
        return point;
    }

    test('test_identity_transformation', () => {
        const result = transformPointCloudToReferenceFrame(pointCloud, refFramePoints);
        const expected = pointCloud.map(point => subtract(point, [0, 0, 0]));
        arraysAlmostEqual(result, expected);
    });

    test('test_translation', () => {
        const framePoints = [[1, 1, 1], [2, 1, 1], [1, 2, 1]];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        const expected = [[-1, 0, 1], [2, 3, 4], [5, 6, 7]];
        arraysAlmostEqual(result, expected);
    });

    test('test_rotation', () => {
        const framePoints = [[0, 0, 0], [0, 1, 0], [0, 1, 1]];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        const expected = [[2, 3, 1], [5, 6, 4], [8, 9, 7]];
        arraysAlmostEqual(result, expected);
    });

    test('test_non_orthonormal_frame', () => {
        const framePoints = [[0, 0, 0], [1, 0, 0], [1, 1, 0]];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        
        const u = [1, 0, 0];
        const v = [0, 1, 0];
        const w = cross(u, v);
        const rotationMatrix = transpose([u, v, w]);
        const expected = pointCloud.map(point => column(point, 3).map((row, i) => row * rotationMatrix[i][i]));
        
        arraysAlmostEqual(result, expected);
    });

    test('test_inverted_frame', () => {
        const framePoints = [[0, 0, 0], [-1, 0, 0], [0, -1, 0]];
        const result = transformPointCloudToReferenceFrame(pointCloud, framePoints);
        
        const transformationMatrix = [[-1, 0, 0], [0, -1, 0], [0, 0, 1]];
        const expected = pointCloud.map(point => column(point, 3).map((row, i) => row * transformationMatrix[i][i]));
        
        arraysAlmostEqual(result, expected);
    });
});
