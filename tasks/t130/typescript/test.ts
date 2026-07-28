function expectMatrixCloseTo(received: number[][], expected: number[][]): void {
    expect(received).toHaveLength(expected.length);
    received.forEach((row, rowIndex) => {
        expect(row).toHaveLength(expected[rowIndex].length);
        row.forEach((value, columnIndex) => {
            expect(value).toBeCloseTo(expected[rowIndex][columnIndex], 12);
        });
    });
}

describe('TestrotatePointCloudAroundYAxis', () => {
    test('no rotation', () => {
        const pointCloud = [[1.0, 2.0, 3.0]];
        const rotationAngle = 0;
        const expectedOutput = pointCloud;
        expectMatrixCloseTo(rotatePointCloudAroundYAxis(pointCloud, rotationAngle), expectedOutput);
    });

    test('180 degree rotation', () => {
        const pointCloud = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0]];
        const rotationAngle = Math.PI;
        const expectedOutput = [[-1.0, 0.0, 0.0], [0.0, 1.0, 0.0]];
        expectMatrixCloseTo(rotatePointCloudAroundYAxis(pointCloud, rotationAngle), expectedOutput);
    });

    test('full rotation', () => {
        const pointCloud = [[1.0, 2.0, 3.0]];
        const rotationAngle = 2 * Math.PI;
        const expectedOutput = pointCloud;
        expectMatrixCloseTo(rotatePointCloudAroundYAxis(pointCloud, rotationAngle), expectedOutput);
    });

    test('90 degree rotation', () => {
        const pointCloud = [[1.0, 0.0, 0.0], [0.0, 0.0, 1.0]];
        const rotationAngle = Math.PI / 2;
        const expectedOutput = [[0.0, 0.0, 1.0], [-1.0, 0.0, 0.0]];
        expectMatrixCloseTo(rotatePointCloudAroundYAxis(pointCloud, rotationAngle), expectedOutput);
    });

    test('empty point cloud', () => {
        expectMatrixCloseTo(rotatePointCloudAroundYAxis([], Math.PI / 2), []);
    });
});
