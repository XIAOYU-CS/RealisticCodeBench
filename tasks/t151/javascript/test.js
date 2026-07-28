describe('convertIso8601DurationToReadable Function Tests', () => {
    test('should correctly convert full ISO 8601 duration with hours, minutes, seconds, and milliseconds', () => {
        expect(convertIso8601DurationToReadable('PT1H23M45.678S')).toBe('1h23m45s678ms');
    });

    test('should correctly convert duration with only seconds and milliseconds', () => {
        expect(convertIso8601DurationToReadable('PT45.5S')).toBe('45s500ms');
    });

    test('should correctly convert duration with hours and minutes, but no seconds', () => {
        expect(convertIso8601DurationToReadable('PT2H5M')).toBe('2h5m');
    });

    test('should correctly convert duration with only seconds, no milliseconds', () => {
        expect(convertIso8601DurationToReadable('PT20S')).toBe('20s');
    });

    test('should return empty string for invalid duration without PT prefix', () => {
        expect(convertIso8601DurationToReadable('1H23M45S')).toBe('');
    });
});
