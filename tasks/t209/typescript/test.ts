describe('rgbToHex and hexToRgb', () => {

    test('should correctly convert RGB to HEX', () => {
        const rgb = { r: 255, g: 99, b: 71 };
        const result = rgbToHex(rgb);
        expect(result).toBe('#ff6347');
    });

    test('should correctly convert HEX to RGB', () => {
        const hex = '#ff6347';
        const result = hexToRgb(hex);
        expect(result).toEqual({ r: 255, g: 99, b: 71 });
    });

    test('should handle invalid RGB components gracefully', () => {
        const rgb = { r: 300, g: -10, b: 128 };
        const result = rgbToHex(rgb);
        expect(result).toBe('#12c-a80');
    });

    test('should return null for invalid HEX strings', () => {
        const invalidHex = '#ggg123';
        const result = hexToRgb(invalidHex);
        expect(result).toBeNull();
    });

    test('should handle boundary values in RGB correctly', () => {
        const rgb = { r: 0, g: 0, b: 0 };
        const result = rgbToHex(rgb);
        expect(result).toBe('#000000');

        const rgbWhite = { r: 255, g: 255, b: 255 };
        const resultWhite = rgbToHex(rgbWhite);
        expect(resultWhite).toBe('#ffffff');
    });
});
