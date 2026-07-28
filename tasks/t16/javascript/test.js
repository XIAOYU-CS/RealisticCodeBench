describe('Classify JSON Objects by PID', () => {
  let tempDir;
  let sourceFile;
  let matchFile;
  let mismatchFile;
  
  beforeAll(() => {
    tempDir = fs.mkdtempSync(require('path').join(__dirname, 'qa_item-'));
    
    sourceFile = require('path').join(tempDir, 'source.json');
    matchFile = require('path').join(tempDir, 'match.json');
    mismatchFile = require('path').join(tempDir, 'mismatch.json');
    
    const data = [
      { name: "Alice", pid: 1 },
      { name: "Bob", pid: 2 },
      { name: "Charlie", pid: 3 }
    ];

    fs.writeFileSync(sourceFile, JSON.stringify(data));
  });

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });
  test('all match', () => {
    classifyJsonObjectsByPid(sourceFile, [1, 2, 3], matchFile, mismatchFile);
    
    const matches = JSON.parse(fs.readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(fs.readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(3);
    expect(mismatches.length).toBe(0);
  });

  test('no match', () => {
    classifyJsonObjectsByPid(sourceFile, [4, 5], matchFile, mismatchFile);
    
    const matches = JSON.parse(fs.readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(fs.readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(0);
    expect(mismatches.length).toBe(3);
  });

  test('partial match', () => {
    classifyJsonObjectsByPid(sourceFile, [1, 3], matchFile, mismatchFile);
    
    const matches = JSON.parse(fs.readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(fs.readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(2);
    expect(mismatches.length).toBe(1);
  });

  test('empty PID list', () => {
    classifyJsonObjectsByPid(sourceFile, [], matchFile, mismatchFile);
    
    const matches = JSON.parse(fs.readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(fs.readFileSync(mismatchFile, 'utf8'));

    expect(matches.length).toBe(0);
    expect(mismatches.length).toBe(3);
  });

  test('object without pid is mismatch', () => {
    fs.writeFileSync(sourceFile, JSON.stringify([
      { name: "Alice", pid: 1 },
      { name: "NoPid" },
      { name: "Bob", pid: 2 }
    ]));

    classifyJsonObjectsByPid(sourceFile, [1], matchFile, mismatchFile);

    const matches = JSON.parse(fs.readFileSync(matchFile, 'utf8'));
    const mismatches = JSON.parse(fs.readFileSync(mismatchFile, 'utf8'));

    expect(matches.map(obj => obj.name)).toEqual(["Alice"]);
    expect(mismatches.map(obj => obj.name)).toEqual(["NoPid", "Bob"]);
  });
});
