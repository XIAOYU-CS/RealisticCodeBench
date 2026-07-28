describe('Test RGB to HSV Conversion', () => {
  it('converts pure red color correctly', () => {
      const r = 255;
      const g = 0;
      const b = 0;
      const expectedResult = [0, 100, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('converts pure green color correctly', () => {
      const r = 0;
      const g = 255;
      const b = 0;
      const expectedResult = [120, 100, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('converts pure blue color correctly', () => {
      const r = 0;
      const g = 0;
      const b = 255;
      const expectedResult = [240, 100, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('converts white color correctly', () => {
      const r = 255;
      const g = 255;
      const b = 255;
      const expectedResult = [0, 0, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('converts black color correctly', () => {
      const r = 0;
      const g = 0;
      const b = 0;
      const expectedResult = [0, 0, 0];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });
});