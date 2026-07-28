describe('Test RGB to HSV Conversion', () => {
  it('should convert pure red color correctly', () => {
      const r = 255;
      const g = 0;
      const b = 0;
      const expectedResult: [number, number, number] = [0, 100, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('should convert pure green color correctly', () => {
      const r = 0;
      const g = 255;
      const b = 0;
      const expectedResult: [number, number, number] = [120, 100, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('should convert pure blue color correctly', () => {
      const r = 0;
      const g = 0;
      const b = 255;
      const expectedResult: [number, number, number] = [240, 100, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('should convert white color correctly', () => {
      const r = 255;
      const g = 255;
      const b = 255;
      const expectedResult: [number, number, number] = [0, 0, 100];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });

  it('should convert black color correctly', () => {
      const r = 0;
      const g = 0;
      const b = 0;
      const expectedResult: [number, number, number] = [0, 0, 0];
      const result = rgbToHsv(r, g, b);
      expect(result).toEqual(expectedResult);
  });
});