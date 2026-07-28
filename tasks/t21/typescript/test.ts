describe('TestPointInPolygon', () => {
    let square: [number, number][];
    let triangle: [number, number][];
    let concave: [number, number][];

    beforeEach(() => {
        square = [[0, 0], [0, 10], [10, 10], [10, 0]];
        triangle = [[0, 0], [5, 10], [10, 0]];
        concave = [[0, 0], [5, 5], [10, 0], [5, 10], [0, 10]];
    });

    it('should detect a point inside the square', () => {
        expect(isPointInPolygon([5, 5], square)).toBe(true);
    });

    it('should detect a point outside the square', () => {
        expect(isPointInPolygon([15, 5], square)).toBe(false);
    });

    it('should detect a point on the edge of the triangle', () => {
        expect(isPointInPolygon([5, 0], triangle)).toBe(false);
    });

    it('should detect a point inside the concave polygon', () => {
        expect(isPointInPolygon([5, 9], concave)).toBe(true);
    });

    it('should detect a point outside the concave polygon', () => {
        expect(isPointInPolygon([5, 1], concave)).toBe(false);
    });
});