const createVector3 = (x: number, y: number, z: number): Vector3 => ({
  x,
  y,
  z,
  distanceTo: (other: Vector3) => {
    const dx = x - other.x;
    const dy = y - other.y;
    const dz = z - other.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
});

const validateMST = (mst: number[][], numPoints: number) => {
  expect(mst.length).toBe(numPoints);

  const totalEdges = mst.reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;

  if (numPoints <= 1) {
    expect(totalEdges).toBe(0);
  } else {
    expect(totalEdges).toBe(numPoints - 1);
  }

  for (let i = 0; i < mst.length; i++) {
    for (const j of mst[i]) {
      expect(mst[j]).toContain(i);
    }
  }
};

describe('computeMst', () => {
  test('should return empty MST for empty points array', () => {
    const points: Vector3[] = [];
    const mst = computeMst(points);
    expect(mst).toEqual([]);
  });

  test('should return single node MST for one point', () => {
    const points = [createVector3(0, 0, 0)];
    const mst = computeMst(points);
    validateMST(mst, 1);
    expect(mst[0]).toEqual([]);
  });

  test('should return correct MST for two points', () => {
    const points = [
      createVector3(0, 0, 0),
      createVector3(3, 4, 0)
    ];
    const mst = computeMst(points);
    validateMST(mst, 2);
    expect(mst[0]).toEqual([1]);
    expect(mst[1]).toEqual([0]);
  });

  test('should return correct MST for three colinear points', () => {
    const points = [
      createVector3(0, 0, 0),
      createVector3(1, 0, 0),
      createVector3(3, 0, 0)
    ];
    const mst = computeMst(points);
    validateMST(mst, 3);
    const totalEdges = mst.reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;
    expect(totalEdges).toBe(2);
    expect(mst[0]).toContain(1);
    expect(mst[1]).toContain(2);
  });

  test('should return correct MST for four 3D points', () => {
    const points = [
      createVector3(0, 0, 0),
      createVector3(0, 0, 1),
      createVector3(1, 0, 0),
      createVector3(1, 1, 1)
    ];
    const mst = computeMst(points);
    validateMST(mst, 4);
    const totalEdges = mst.reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;
    expect(totalEdges).toBe(3);
  });
});
