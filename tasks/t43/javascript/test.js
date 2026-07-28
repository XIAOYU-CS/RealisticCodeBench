describe('TesttransformDictListsToListDicts', () => {
  describe('test_standard_conversion', () => {
      it('should correctly convert a dictionary of lists into a list of dictionaries with equal length lists', () => {
          const dictOfLists = {
              name: ['Alice', 'Bob', 'Charlie'],
              age: [25, 30, 35],
              city: ['New York', 'Los Angeles', 'Chicago']
          };
          const expectedResult = [
              { name: 'Alice', age: 25, city: 'New York' },
              { name: 'Bob', age: 30, city: 'Los Angeles' },
              { name: 'Charlie', age: 35, city: 'Chicago' }
          ];
          const result = transformDictListsToListDicts(dictOfLists);
          expect(result).toEqual(expectedResult);
      });
  });

  describe('test_empty_lists', () => {
      it('should handle empty lists correctly', () => {
          const dictOfLists = {
              name: [],
              age: [],
              city: []
          };
          const expectedResult = [];
          const result = transformDictListsToListDicts(dictOfLists);
          expect(result).toEqual(expectedResult);
      });
  });

  describe('test_empty_object', () => {
      it('should return an empty array for an empty object', () => {
          const result = transformDictListsToListDicts({});
          expect(result).toEqual([]);
      });
  });

  describe('test_single_key_object', () => {
      it('should convert a single-key object of arrays into an array of objects', () => {
          const dictOfLists = {
              scores: [90, 85, 92, 88]
          };
          const expectedResult = [
              { scores: 90 },
              { scores: 85 },
              { scores: 92 },
              { scores: 88 }
          ];
          const result = transformDictListsToListDicts(dictOfLists);
          expect(result).toEqual(expectedResult);
      });
  });

  describe('test_different_length_arrays', () => {
      it('should throw when arrays have different lengths', () => {
          const dictOfLists = {
              a: [1, 2, 3],
              b: [4, 5]
          };
          expect(() => transformDictListsToListDicts(dictOfLists)).toThrow('same length');
      });
  });

  describe('test_single_element_lists', () => {
      it('should correctly convert a dictionary of single-element lists into a list of dictionaries', () => {
          const dictOfLists = {
              name: ['Alice'],
              age: [25],
              city: ['New York']
          };
          const expectedResult = [
              { name: 'Alice', age: 25, city: 'New York' }
          ];
          const result = transformDictListsToListDicts(dictOfLists);
          expect(result).toEqual(expectedResult);
      });
  });
});
