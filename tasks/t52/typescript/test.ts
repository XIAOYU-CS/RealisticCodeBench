describe('TestFillMissingWithFirstValid', () => {
    it('test_basic_filling', () => {
      const df = [
        { A: 1, B: 'foo' },
        { A: null, B: 'bar' },
        { A: 3, B: null },
        { A: null, B: 'baz' }
      ];
      const result = fillMissingWithFirstValid(df, 'B');
      const expected = [
        { A: 1, B: 'foo' },
        { A: null, B: 'bar' },
        { A: 3, B: 'foo' },
        { A: null, B: 'baz' }
      ];
  
      expect(result).toEqual(expected);
    });
  
    it('test_no_missing_values', () => {
      const df = [
        { A: 1, B: 'foo' },
        { A: 2, B: 'bar' },
        { A: 3, B: 'baz' }
      ];
      const result = fillMissingWithFirstValid(df, 'B');
      const expected = [
        { A: 1, B: 'foo' },
        { A: 2, B: 'bar' },
        { A: 3, B: 'baz' }
      ];
  
      expect(result).toEqual(expected);
    });
  
    it('test_single_valid_value', () => {
      const df = [
        { A: 1, B: null },
        { A: null, B: 'bar' },
        { A: null, B: null },
        { A: 4, B: null }
      ];
      const result = fillMissingWithFirstValid(df, 'B');
      const expected = [
        { A: 1, B: 'bar' },
        { A: null, B: 'bar' },
        { A: null, B: 'bar' },
        { A: 4, B: 'bar' }
      ];
  
      expect(result).toEqual(expected);
    });
  
    it('test_multiple_valid_values', () => {
      const df = [
        { A: 1, B: null },
        { A: null, B: 'bar' },
        { A: 3, B: 'foo' },
        { A: 4, B: null }
      ];
      const result = fillMissingWithFirstValid(df, 'B');
      const expected = [
        { A: 1, B: 'bar' },
        { A: null, B: 'bar' },
        { A: 3, B: 'foo' },
        { A: 4, B: 'bar' }
      ];
  
      expect(result).toEqual(expected);
    });

    it('test_missing_column_raises', () => {
      const df = [
        { A: 1, B: 'foo' },
        { A: 2, B: null }
      ];

      expect(() => fillMissingWithFirstValid(df, 'C')).toThrow("Column 'C' does not exist in the DataFrame.");
    });
  });
