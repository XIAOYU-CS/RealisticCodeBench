describe('TestCompareFiles', () => {
  let file1Path;
  let file2Path;

  beforeEach(() => {
      file1Path = 'file1.txt';
      file2Path = 'file2.txt';
  });

  afterEach(() => {
      if (fs.existsSync(file1Path)) {
          fs.unlinkSync(file1Path);
      }
      if (fs.existsSync(file2Path)) {
          fs.unlinkSync(file2Path);
      }
  });

  it('should detect no differences in identical files', () => {
      const file1Content = "Line1\nLine2\nLine3\n";
      const file2Content = "Line1\nLine2\nLine3\n";

      fs.writeFileSync(file1Path, file1Content);
      fs.writeFileSync(file2Path, file2Content);

      const result = compareFiles(file1Path, file2Path);
      expect(result.length).toBe(0, "There should be no differences detected");
  });

  it('should detect differences in different files', () => {
      const file1Content = "Line1\nLine2\nLine3\n";
      const file2Content = "Line1\nLineChanged\nLine3\n";

      fs.writeFileSync(file1Path, file1Content);
      fs.writeFileSync(file2Path, file2Content);

      const result = compareFiles(file1Path, file2Path);
      expect(result.length).not.toBe(0, "There should be differences detected");
  });

  it('should detect no differences in empty files', () => {
      fs.writeFileSync(file1Path, "");
      fs.writeFileSync(file2Path, "");

      const result = compareFiles(file1Path, file2Path);
      expect(result.length).toBe(0);
  });

  it('should throw an error when one of the files does not exist', () => {
      const mockOpen = jest.fn().mockImplementation(() => {
          throw new Error();
      });

      global.open = mockOpen;

      expect(() => compareFiles('nonexistent.txt', 'file2.txt')).toThrow();

      delete global.open;
  });

  it('should throw an error when there is an error reading the file', () => {
      const mockOpen = jest.fn().mockImplementation(() => {
          throw new Error();
      });

      global.open = mockOpen;

      expect(() => compareFiles('file1.txt', 'file2.txt')).toThrow();

      delete global.open;
  });
});
