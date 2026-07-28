const fs = require('fs');
const path = require('path');

describe('TestCommonColumns', () => {
  const testDir = 'test_dir';

  beforeEach(() => {
      fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
      for (const file of fs.readdirSync(testDir)) {
          fs.unlinkSync(path.join(testDir, file));
      }
      fs.rmdirSync(testDir);
  });

  it('should find all same columns', () => {
      const data1 = "A,B,C\n1,2,3";
      const data2 = "A,B,C\n4,5,6";
      const data3 = "A,B,C\n7,8,9";
      const filenames = ['file1.csv', 'file2.csv', 'file3.csv'];
      const datas = [data1, data2, data3];

      filenames.forEach((filename, index) => {
          fs.writeFileSync(path.join(testDir, filename), datas[index]);
      });

      const result = findCommonColumns(testDir);
      expect(new Set(result)).toEqual(new Set(['C', 'B', 'A']));
  });

  it('should find no common columns', () => {
      const data1 = "A,B,C\n1,2,3";
      const data2 = "D,E,F\n4,5,6";
      const data3 = "G,H,I\n7,8,9";
      const filenames = ['file1.csv', 'file2.csv', 'file3.csv'];
      const datas = [data1, data2, data3];

      filenames.forEach((filename, index) => {
          fs.writeFileSync(path.join(testDir, filename), datas[index]);
      });

      const result = findCommonColumns(testDir);
      expect(result).toEqual([]);
  });

  it('should return empty list for an empty directory', () => {
      const result = findCommonColumns(testDir);
      expect(result).toEqual([]);
  });

  it('should find some common columns', () => {
      const data1 = "A,B,C\n1,2,3";
      const data2 = "B,C,D\n4,5,6";
      const data3 = "C,D,E\n7,8,9";
      const filenames = ['file1.csv', 'file2.csv', 'file3.csv'];
      const datas = [data1, data2, data3];

      filenames.forEach((filename, index) => {
          fs.writeFileSync(path.join(testDir, filename), datas[index]);
      });

      const result = findCommonColumns(testDir);
      expect(result).toEqual(['C']);
  });

  it('should find mixed common and unique columns', () => {
      const data1 = "A,B,C\n1,2,3";
      const data2 = "B,C,D\n4,5,6";
      const data3 = "B,C,E\n7,8,9";
      const filenames = ['file1.csv', 'file2.csv', 'file3.csv'];
      const datas = [data1, data2, data3];

      filenames.forEach((filename, index) => {
          fs.writeFileSync(path.join(testDir, filename), datas[index]);
      });

      const result = findCommonColumns(testDir);
      expect(new Set(result)).toEqual(new Set(['B', 'C']));
  });
});
