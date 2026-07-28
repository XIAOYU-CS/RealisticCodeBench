describe('opcDataToPixels', () => {
    test('converts data in RGB format correctly', () => {
        const data = new Uint8Array([255, 0, 0, 0, 255, 0]);
        const result = opcDataToPixels(data, 'rgb');
        expect(result).toEqual([[255, 0, 0], [0, 255, 0]]);
    });

    test('converts data in RGBA format correctly', () => {
        const data = new Uint8Array([0, 0, 255, 128]);
        const result = opcDataToPixels(data, 'rgba');
        expect(result).toEqual([[0, 0, 255, 128]]);
    });

    test('converts data in GRB format correctly', () => {
        const data = new Uint8Array([0, 255, 0]);
        const result = opcDataToPixels(data, 'grb');
        expect(result).toEqual([[255, 0, 0]]);
    });

    test('converts data in BGR format correctly', () => {
        const data = new Uint8Array([0, 0, 255]);
        const result = opcDataToPixels(data, 'bgr');
        expect(result).toEqual([[255, 0, 0]]);
    });

    test('normalizes values correctly when normalize is true', () => {
        const data = new Uint8Array([255, 128, 0]);
        const result = opcDataToPixels(data, 'rgb', true);
        expect(result[0][0]).toBeCloseTo(1.0, 5);
        expect(result[0][1]).toBeCloseTo(128 / 255, 5);
        expect(result[0][2]).toBeCloseTo(0.0, 5);
    });
});