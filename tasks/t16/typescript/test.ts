interface DataObject {
  name: string;
  pid: number;
}

describe('classifyJsonObjectsByPid', () => {
  const tempDir = require('fs').mkdtempSync(require('path').join(__dirname, 'qa_item-'));
  const sourceFile = require('path').join(tempDir, 'source.json');
  const matchFile = require('path').join(tempDir, 'match.json');
  const mismatchFile = require('path').join(tempDir, 'mismatch.json');

  const data: DataObject[] = [
    { name: 'Alice', pid: 1 },
    { name: 'Bob', pid: 2 },
    { name: 'Charlie', pid: 3 }
  ];
  
  const pidList = [1, 3];

  beforeAll(() => {
    require('fs').writeFileSync(sourceFile, JSON.stringify(data));
  });

  afterAll(() => {
    require('fs').rmdirSync(tempDir, { recursive: true });
  });

  test('all match', () => {
    classifyJsonObjectsByPid(sourceFile, [1, 2, 3], matchFile, mismatchFile);
    
    const matches = JSON.parse(require('fs').readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(require('fs').readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(3);
    expect(mismatches.length).toBe(0);
  });

  test('no match', () => {
    classifyJsonObjectsByPid(sourceFile, [4, 5], matchFile, mismatchFile);
    
    const matches = JSON.parse(require('fs').readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(require('fs').readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(0);
    expect(mismatches.length).toBe(3);
  });

  test('partial match', () => {
    classifyJsonObjectsByPid(sourceFile, pidList, matchFile, mismatchFile);
    
    const matches = JSON.parse(require('fs').readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(require('fs').readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(2);
    expect(mismatches.length).toBe(1);
  });

  test('empty pid list', () => {
    classifyJsonObjectsByPid(sourceFile, [], matchFile, mismatchFile);
    
    const matches = JSON.parse(require('fs').readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(require('fs').readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(0);
    expect(mismatches.length).toBe(3);
  });

  test('object without pid is mismatch', () => {
    require('fs').writeFileSync(sourceFile, JSON.stringify([
      { name: 'Alice', pid: 1 },
      { name: 'NoPid' },
      { name: 'Bob', pid: 2 }
    ]));

    classifyJsonObjectsByPid(sourceFile, [1], matchFile, mismatchFile);

    const matches = JSON.parse(require('fs').readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(require('fs').readFileSync(mismatchFile, 'utf8'));

    expect(matches.map((obj: DataObject) => obj.name)).toEqual(['Alice']);
    expect(mismatches.map((obj: DataObject) => obj.name)).toEqual(['NoPid', 'Bob']);
  });
});
