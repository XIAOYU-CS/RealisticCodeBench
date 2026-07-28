describe('TesttransformDictListsToListDicts', () => {
  it('test_standard_conversion', () => {
      const dictOfLists = {
          "name": ["Alice", "Bob", "Charlie"],
          "age": [25, 30, 35],
          "city": ["New York", "Los Angeles", "Chicago"]
      };
      const expectedResult = [
          { name: 'Alice', age: 25, city: 'New York' },
          { name: 'Bob', age: 30, city: 'Los Angeles' },
          { name: 'Charlie', age: 35, city: 'Chicago' }
      ];
      const result = transformDictListsToListDicts(dictOfLists);
      expect(result).toEqual(expectedResult);
  });

  it('test_empty_lists', () => {
      const dictOfLists = {
          "name": [],
          "age": [],
          "city": []
      };
      const expectedResult = [];
      const result = transformDictListsToListDicts(dictOfLists);
      expect(result).toEqual(expectedResult);
  });

  it('test_empty_object', () => {
      const result = transformDictListsToListDicts({});
      expect(result).toEqual([]);
  });

  it('test_single_key_object', () => {
      const dictOfLists = {
          "scores": [90, 85, 92, 88]
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

  it('test_different_length_arrays', () => {
      const dictOfLists = {
          "a": [1, 2, 3],
          "b": [4, 5]
      };
      expect(() => transformDictListsToListDicts(dictOfLists)).toThrow('same length');
  });

  it('test_single_element_lists', () => {
      const dictOfLists = {
          "name": ["Alice"],
          "age": [25],
          "city": ["New York"]
      };
      const expectedResult = [
          { name: 'Alice', age: 25, city: 'New York' }
      ];
      const result = transformDictListsToListDicts(dictOfLists);
      expect(result).toEqual(expectedResult);
  });
});
