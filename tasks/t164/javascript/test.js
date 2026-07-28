describe('convertHslToRgb function', () => {
    test('converts pure red hue correctly', () => {
        expect(convertHslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
    });

    test('returns gray for zero saturation', () => {
        expect(convertHslToRgb(240, 0, 50)).toEqual({ r: 128, g: 128, b: 128 });
    });

    test('returns white for full lightness', () => {
        expect(convertHslToRgb(120, 50, 100)).toEqual({ r: 255, g: 255, b: 255 });
    });

    test('converts full saturation and mid lightness blue correctly', () => {
        expect(convertHslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
    });

    test('handles edge hue at 360 degrees correctly', () => {
        expect(convertHslToRgb(360, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
    });
});