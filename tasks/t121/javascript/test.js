describe('TestHexToAnsi', () => {
    describe('testValidColors', () => {
        it('should handle valid hex color inputs correctly', () => {
            expect(hexToAnsi('#FF5733')).toBe('\x1b[38;2;255;87;51m');
            expect(hexToAnsi('#00FF00')).toBe('\x1b[38;2;0;255;0m');
            expect(hexToAnsi('#0000FF')).toBe('\x1b[38;2;0;0;255m');
        });
    });

    describe('testBlackAndWhite', () => {
        it('should handle black and white colors correctly', () => {
            expect(hexToAnsi('#000000')).toBe('\x1b[38;2;0;0;0m');
            expect(hexToAnsi('#FFFFFF')).toBe('\x1b[38;2;255;255;255m');
        });
    });

    describe('testLowercaseHexDigits', () => {
        it('should handle lowercase hex digits', () => {
            expect(hexToAnsi('#abcdef')).toBe('\x1b[38;2;171;205;239m');
        });
    });

    describe('testLeadingZeroComponents', () => {
        it('should handle leading zero components', () => {
            expect(hexToAnsi('#0A0B0C')).toBe('\x1b[38;2;10;11;12m');
        });
    });

    describe('testInvalidFormat', () => {
        it('should reject missing hash and shorthand values', () => {
            expect(() => hexToAnsi('FF5733')).toThrow();
            expect(() => hexToAnsi('#FFF')).toThrow();
        });
    });

    describe('testInvalidHexDigits', () => {
        it('should reject non-hex digits', () => {
            expect(() => hexToAnsi('#GG0000')).toThrow();
        });
    });
});
