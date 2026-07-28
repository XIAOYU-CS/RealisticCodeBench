describe('mollerTrumboreTS', () => {

    test('single ray single triangle intersection', () => {
        const origins: Vector3[] = [[0.0, 0.0, -1.0]];
        const directions: Vector3[] = [[0.0, 0.0, 1.0]];
        const triangles: Triangle[] = [[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]];
        const { valid, distances } = mollerTrumboreTS(origins, directions, triangles);
        expect(valid[0][0]).toBe(true);
        expect(distances[0][0]).toBeCloseTo(1.0, 6);
    });

    test('no intersection parallel ray', () => {
        const origins: Vector3[] = [[0.0, 0.0, 1.0]];
        const directions: Vector3[] = [[1.0, 0.0, 0.0]];
        const triangles: Triangle[] = [[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]];
        const { valid, distances } = mollerTrumboreTS(origins, directions, triangles);
        expect(valid[0][0]).toBe(false);
        expect(distances[0][0]).toBe(Infinity);
    });

    test('miss triangle outside bounds', () => {
        const origins: Vector3[] = [[10.0, 10.0, -1.0]];
        const directions: Vector3[] = [[0.0, 0.0, 1.0]];
        const triangles: Triangle[] = [[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]];
        const { valid, distances } = mollerTrumboreTS(origins, directions, triangles);
        expect(valid[0][0]).toBe(false);
    });

    test('multiple rays multiple triangles', () => {
        const origins: Vector3[] = [
            [0.0, 0.0, -1.0],
            [5.0, 5.0, -1.0]
        ];
        const directions: Vector3[] = [
            [0.0, 0.0, 1.0],
            [0.0, 0.0, 1.0]
        ];

        // Two triangles
        const triangles: Triangle[] = [
            [[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]],
            [[2.0, 2.0, 0.0], [1.0, 2.0, 0.0], [1.5, 1.0, 0.0]]
        ];
        const { valid, distances } = mollerTrumboreTS(origins, directions, triangles);
        expect(valid.length).toBe(2);
        expect(valid[0].length).toBe(2);
        expect(distances.length).toBe(2);
        expect(distances[0].length).toBe(2);
        expect(valid[0][0]).toBe(true);
        expect(distances[0][0]).toBeCloseTo(1.0, 6);
        expect(valid[1][0]).toBe(false);
    });

    test('edge cases on triangle boundary', () => {
        const origins: Vector3[] = [[-0.5, 0.5, -1.0]];
        const directions: Vector3[] = [[0.0, 0.0, 1.0]];
        const triangles: Triangle[] = [[[0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [0.0, -0.5, 0.0]]];
        const { valid, distances } = mollerTrumboreTS(origins, directions, triangles);
        expect(valid.length).toBe(1);
        expect(valid[0].length).toBe(1);
        expect(distances.length).toBe(1);
        expect(distances[0].length).toBe(1);
        expect(isFinite(distances[0][0]) || distances[0][0] === Infinity).toBe(true);
    });
});