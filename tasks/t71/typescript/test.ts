describe('TestInvertDictionary', () => {
    it('test_normal_dictionary', () => {
        const originalDict = { 'a': 1, 'b': 2, 'c': 3 };
        const expected = { 1: 'a', 2: 'b', 3: 'c' };
        const result = invertDictionary(originalDict);
        expect(result).toEqual(expected);
    });

    it('test_dictionary_with_duplicates', () => {
        const originalDict = { 'a': 1, 'b': 1, 'c': 2 };
        const expected = { 1: ['a', 'b'], 2: 'c' };
        const result = invertDictionary(originalDict);
        expect(result).toEqual(expected);
    });

    it('test_empty_dictionary', () => {
        const originalDict = {};
        const expected = {};
        const result = invertDictionary(originalDict);
        expect(result).toEqual(expected);
    });

    it('test_non_string_keys', () => {
        const originalDict = { 1: 'apple', 2: 'banana', 3: 'apple' };
        const expected = { 'apple': [1, 3], 'banana': 2 };
        const result = invertDictionary(originalDict);
        expect(result).toEqual(expected);
    });

    it('test_mixed_types', () => {
        const originalDict = { 'a': 1, 2: 'two', 'three': 3 };
        const expected = { 1: 'a', 'two': 2, 3: 'three' };
        const result = invertDictionary(originalDict);
        expect(result).toEqual(expected);
    });
});