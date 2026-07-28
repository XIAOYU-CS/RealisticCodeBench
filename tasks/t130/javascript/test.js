function expectMatrixCloseTo(received, expected) {
  expect(received).toHaveLength(expected.length);
  received.forEach((row, rowIndex) => {
    expect(row).toHaveLength(expected[rowIndex].length);
    row.forEach((value, columnIndex) => {
      expect(value).toBeCloseTo(expected[rowIndex][columnIndex], 12);
    });
  });
}

describe('rotatePointCloudAroundYAxis', () => {
  
  test('no rotation (rotation angle is 0)', () => {
    const pointCloud = [[1.0, 2.0, 3.0]];
    const rotationAngle = 0;
    const expectedOutput = pointCloud;

    const result = rotatePointCloudAroundYAxis(pointCloud, rotationAngle);
    
    expectMatrixCloseTo(result, expectedOutput);
  });

  test('180-degree rotation (π radians)', () => {
    const pointCloud = [
      [1.0, 0.0, 0.0], 
      [0.0, 1.0, 0.0]
    ];
    const rotationAngle = Math.PI;
    const expectedOutput = [
      [-1.0, 0.0, 0.0], 
      [0.0, 1.0, 0.0]
    ];

    const result = rotatePointCloudAroundYAxis(pointCloud, rotationAngle);
    
    expectMatrixCloseTo(result, expectedOutput);
  });

  test('full rotation (360 degrees or 2π radians)', () => {
    const pointCloud = [[1.0, 2.0, 3.0]];
    const rotationAngle = 2 * Math.PI;
    const expectedOutput = pointCloud;

    const result = rotatePointCloudAroundYAxis(pointCloud, rotationAngle);
    expectMatrixCloseTo(result, expectedOutput);
  });

  test('90-degree rotation', () => {
    const pointCloud = [
      [1.0, 0.0, 0.0],
      [0.0, 0.0, 1.0]
    ];
    const rotationAngle = Math.PI / 2;
    const expectedOutput = [
      [0.0, 0.0, 1.0],
      [-1.0, 0.0, 0.0]
    ];

    const result = rotatePointCloudAroundYAxis(pointCloud, rotationAngle);
    expectMatrixCloseTo(result, expectedOutput);
  });

  test('empty point cloud', () => {
    const result = rotatePointCloudAroundYAxis([], Math.PI / 2);
    expectMatrixCloseTo(result, []);
  });

});
