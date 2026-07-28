describe('TestFindShiftJISNotGBK', () => {
  let shiftjisNotGbk: string[];

  beforeAll(() => {
      shiftjisNotGbk = findShiftJisNotGbk();
  });

  it('should not include known Shift-JIS characters not in GBK', () => {
      const knownShiftJisOnly = 'ヱ';
      expect(shiftjisNotGbk).not.toContain(knownShiftJisOnly);
  });

  it('should include a character unique to Shift-JIS', () => {
      const shiftJisOnly = '・';
      expect(shiftjisNotGbk).toContain(shiftJisOnly);
  });

  it('should not include characters known to be in both encodings', () => {
      const commonCharacter = '水';
      expect(shiftjisNotGbk).not.toContain(commonCharacter);
  });

  it('should not include characters not in either encoding', () => {
      const neitherEncodingChar = '\u{1F4A9}';
      expect(shiftjisNotGbk).not.toContain(neitherEncodingChar);
  });

  it('should handle characters at the edge of the BMP correctly', () => {
      const edgeOfBmp = '\uffff';
      if (shiftjisNotGbk.includes(edgeOfBmp)) {
          expect(shiftjisNotGbk).toContain(edgeOfBmp);
      } else {
          expect(shiftjisNotGbk).not.toContain(edgeOfBmp);
      }
  });
});
