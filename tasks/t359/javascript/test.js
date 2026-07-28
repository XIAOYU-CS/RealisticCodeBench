/**
 * Creates a 3D vector object with x, y, z coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} z - Z coordinate
 * @returns {Object} Vector3 object with x, y, z properties
 */
function createVector3(x, y, z) {
    return {
        x: x,
        y: y,
        z: z
    };
}

describe('computeMst', () => {
    let point0, point1, point2, point3, point4;

    beforeEach(() => {
        point0 = createVector3(0, 0, 0);
        point1 = createVector3(1, 0, 0);
        point2 = createVector3(3, 0, 0);
        point3 = createVector3(0, 1, 0);
        point4 = createVector3(0, 0, 1);
    });

    test('empty input', () => {
        const mst = computeMst([]);
        expect(mst).toEqual([]);
    });

    test('single point', () => {
        const mst = computeMst([point0]);
        expect(mst.length).toBe(1);
        expect(mst[0]).toEqual([]);
    });

    test('two points', () => {
        const points = [point0, point1];
        const mst = computeMst(points);

        expect(mst.length).toBe(2);
        expect(mst[0].length).toBe(1);
        expect(mst[1].length).toBe(1);

        expect(mst[0][0]).toBe(1);
        expect(mst[1][0]).toBe(0);
    });

    test('three collinear points', () => {
        const points = [point0, point1, point2];
        const mst = computeMst(points);

        expect(mst.length).toBe(3);
        const totalEdges = mst.reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;
        expect(totalEdges).toBe(2);

        expect(mst[0]).toContain(1);
        expect(mst[1]).toContain(2);
    });

    test('four 3d points', () => {
        const points = [point0, point1, point3, point4];
        const mst = computeMst(points);

        expect(mst.length).toBe(4);
        const totalEdges = mst.reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;
        expect(totalEdges).toBe(3);

        const visited = new Set();
        const stack = [0];

        while (stack.length > 0) {
            const node = stack.pop();
            if (!visited.has(node)) {
                visited.add(node);
                for (const neighbor of mst[node]) {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        expect(visited.size).toBe(4);
    });
});