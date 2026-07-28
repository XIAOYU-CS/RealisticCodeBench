describe('TestFindNthWeekdayOfSpecificYear', () => {
    it('should return the 2nd Monday of May 2023', () => {
        const result = findNthWeekdayOfSpecificYear(2023, 5, 2, 0);
        const expected = DateTime.local(2023, 5, 8);
        expect(result).toEqual(expected);
    });

    it('should return the last Monday of May 2023', () => {
        const result = findNthWeekdayOfSpecificYear(2023, 5, 5, 0);
        const expected = DateTime.local(2023, 5, 29);
        expect(result).toEqual(expected);
    });

    it('should return the 1st Tuesday of August 2023', () => {
        const result = findNthWeekdayOfSpecificYear(2023, 8, 1, 1);
        const expected = DateTime.local(2023, 8, 1);
        expect(result).toEqual(expected);
    });

    it('should return the 1st Friday of December 2023', () => {
        const result = findNthWeekdayOfSpecificYear(2023, 12, 1, 4);
        const expected = DateTime.local(2023, 12, 1);
        expect(result).toEqual(expected);
    });

    it('should return the last Monday when February has no 5th Monday', () => {
        const result = findNthWeekdayOfSpecificYear(2023, 2, 5, 0);
        const expected = DateTime.local(2023, 2, 27);
        expect(result).toEqual(expected);
    });
});
