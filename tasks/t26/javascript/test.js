describe('TestFindNthWeekdayOfSpecificYear', () => {
  describe('Regular Occurrence', () => {
      it('should return the 2nd Monday of May 2023', () => {
          const result = findNthWeekdayOfSpecificYear(2023, 5, 2, 0);
          const expected = new Date(2023, 4, 8);
          expect(result).toEqual(expected);
      });
  });

  describe('Last Occurrence', () => {
      it('should return the last Monday of May 2023', () => {
          const result = findNthWeekdayOfSpecificYear(2023, 5, 5, 0);
          const expected = new Date(2023, 4, 29);
          expect(result).toEqual(expected);
      });
  });

  describe('First Day is Weekday', () => {
      it('should return the 1st Tuesday of August 2023', () => {
          const result = findNthWeekdayOfSpecificYear(2023, 8, 1, 1);
          const expected = new Date(2023, 7, 1);
          expect(result).toEqual(expected);
      });
  });

  describe('Edge Year Transition', () => {
      it('should return the 1st Friday of December 2023', () => {
          const result = findNthWeekdayOfSpecificYear(2023, 12, 1, 4);
          const expected = new Date(2023, 11, 1);
          expect(result).toEqual(expected);
      });
  });

  describe('Missing Nth Occurrence', () => {
      it('should return the last Monday when February has no 5th Monday', () => {
          const result = findNthWeekdayOfSpecificYear(2023, 2, 5, 0);
          const expected = new Date(2023, 1, 27);
          expect(result).toEqual(expected);
      });
  });
});
