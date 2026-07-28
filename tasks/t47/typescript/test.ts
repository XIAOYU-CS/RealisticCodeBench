describe('TestFormatTimestampToString', () => {
    describe('test_basic_functionality', () => {
        it('should correctly format the timestamp', () => {
            const timestamp = 1655364000.0;
            const expectedDateStr = 'Thu Jun 16 03:20:00 PM +0800 2022';
            expect(unixTimestampToFormattedLocalDatetime(timestamp)).toBe(expectedDateStr);
        });
    });

    describe('test_default_format', () => {
        it('default format should match the expected date string', () => {
            const timestamp = 1655364000.0;
            const expectedDateStr = 'Thu Jun 16 03:20:00 PM +0800 2022';
            expect(unixTimestampToFormattedLocalDatetime(timestamp)).toBe(expectedDateStr);
        });
    });

    describe('test_custom_format', () => {
        it('should correctly format the timestamp using the custom format', () => {
            const timestamp = 1655364000.0;
            const customFormat = 'yyyy-MM-dd HH:mm:ss';
            const expectedDateStr = '2022-06-16 15:20:00';
            expect(unixTimestampToFormattedLocalDatetime(timestamp, customFormat)).toBe(expectedDateStr);
        });
    });

    describe('test_edge_case_boundary_value', () => {
        it('should correctly format the Unix epoch start time', () => {
            const timestamp = 0.0;
            const expectedDateStr = 'Thu Jan 01 08:00:00 AM +0800 1970';
            expect(unixTimestampToFormattedLocalDatetime(timestamp)).toBe(expectedDateStr);
        });
    });

    describe('test_negative_timestamp', () => {
        it('throws for a negative timestamp', () => {
            expect(() => unixTimestampToFormattedLocalDatetime(-1.0)).toThrow();
        });
    });
});
