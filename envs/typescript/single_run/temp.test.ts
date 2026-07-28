function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

describe('degreesToRadians', () => {
    test('converts common angles', () => {
        expect(degreesToRadians(0)).toBeCloseTo(0, 5);
        expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2, 5);
        expect(degreesToRadians(180)).toBeCloseTo(Math.PI, 5);
        expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2, 5);
    });
});
