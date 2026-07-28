describe('Moller-Trumbore Ray-Triangle Intersection', () => {

    test('single ray single triangle intersect', () => {
        const rayOrigins = [[0, 0, 0]];
        const rayDirections = [[0, 0, 1]];  
        const triangles = [[[0, 0, 2], [1, 0, 2], [0, 1, 2]]]; 

        const { validIntersections, t } = mollerTrumbore(rayOrigins, rayDirections, triangles);

        expect(validIntersections[0][0]).toBe(true);
        expect(t[0][0]).toBeCloseTo(2.0, 5);
    });

    test('no intersection parallel ray', () => {
        const rayOrigins = [[0, 0, 0]];
        const rayDirections = [[1, 0, 0]];
        const triangles = [[[0, 0, 2], [1, 0, 2], [0, 1, 2]]]; 

        const { validIntersections } = mollerTrumbore(rayOrigins, rayDirections, triangles);

        expect(validIntersections[0][0]).toBe(false);
    });

    test('multiple rays multiple triangles', () => {
        const rayOrigins = [[0, 0, 0], [0, 0, 0]];
        const rayDirections = [[0, 0, 1], [0, 0, 1]]; 
        const triangles = [
            [[0, 0, 2], [1, 0, 2], [0, 1, 2]],
            [[0, 0, 4], [1, 0, 4], [0, 1, 4]]
        ];

        const { validIntersections, t } = mollerTrumbore(rayOrigins, rayDirections, triangles);

        // Both rays should intersect both triangles
        expect(validIntersections[0][0]).toBe(true);
        expect(validIntersections[0][1]).toBe(true);
        expect(validIntersections[1][0]).toBe(true);
        expect(validIntersections[1][1]).toBe(true);

        // Check distances
        expect(t[0][0]).toBeCloseTo(2.0, 5);
        expect(t[0][1]).toBeCloseTo(4.0, 5);
        expect(t[1][0]).toBeCloseTo(2.0, 5);
        expect(t[1][1]).toBeCloseTo(4.0, 5);
    });

    test('ray missing triangle', () => {
        const rayOrigins = [[0, 0, 0]];
        const rayDirections = [[0, 0, 1]];
        const triangles = [[[10, 10, 2], [11, 10, 2], [10, 11, 2]]]; 

        const { validIntersections } = mollerTrumbore(rayOrigins, rayDirections, triangles);

        expect(validIntersections[0][0]).toBe(false);
    });

    test('degenerate triangle', () => {
        const rayOrigins = [[0, 0, 0]];
        const rayDirections = [[0, 0, 1]];
        const triangles = [[[0, 0, 2], [0, 0, 2], [0, 1, 2]]];

        const { validIntersections } = mollerTrumbore(rayOrigins, rayDirections, triangles);

        expect(validIntersections[0][0]).toBe(false);
    });

    test('ray intersect triangle edge', () => {
        const rayOrigins = [[0.5, 0, 0]];
        const rayDirections = [[0, 0, 1]];
        const triangles = [[[0, 0, 2], [1, 0, 2], [0, 1, 2]]];

        const { validIntersections, t } = mollerTrumbore(rayOrigins, rayDirections, triangles);

        expect(validIntersections[0][0]).toBe(true);
        expect(t[0][0]).toBeCloseTo(2.0, 5);
    });
});