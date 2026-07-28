describe('computeBezierCurvePoint', () => {
    test('should return the midpoint of two points', () => {
        const points: Coordinates[] = [{ x: 0, y: 0 }, { x: 2, y: 2 }];
        const result = computeBezierCurvePoint(0.5, points);
        expect(result).toEqual({ x: 1, y: 1 });
    });

    test('should return the correct point on a quadratic Bézier curve', () => {
        const points: Coordinates[] = [
            { x: 0, y: 0 },
            { x: 1, y: 2 },
            { x: 2, y: 0 }
        ];
        const result = computeBezierCurvePoint(0.5, points);
        expect(result).toEqual({ x: 1, y: 1 });
    });

    test('should return the correct point on a cubic Bézier curve', () => {
        const points: Coordinates[] = [
            { x: 0, y: 0 },
            { x: 1, y: 3 },
            { x: 3, y: 1 },
            { x: 4, y: 0 }
        ];
        const result = computeBezierCurvePoint(0.5, points);
        expect(result).toEqual({ x: 2, y: 1.5 });
    });

    test('should return the only point when there is a single control point', () => {
        const points: Coordinates[] = [{ x: 5, y: 5 }];
        const result = computeBezierCurvePoint(0.5, points);
        expect(result).toEqual({ x: 5, y: 5 });
    });

    test('should return the first control point when t is 0', () => {
        const points: Coordinates[] = [
            { x: 0, y: 0 },
            { x: 5, y: 5 }
        ];
        const result = computeBezierCurvePoint(0, points);
        expect(result).toEqual({ x: 0, y: 0 });
    });

    test('should return the last control point when t is 1', () => {
        const points: Coordinates[] = [
            { x: 0, y: 0 },
            { x: 5, y: 5 }
        ];
        const result = computeBezierCurvePoint(1, points);
        expect(result).toEqual({ x: 5, y: 5 });
    });

});