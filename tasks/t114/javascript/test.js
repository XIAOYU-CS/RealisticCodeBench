const fs = require('fs');
const path = require('path');

describe('TestSaveContentToFile', () => {
  let testFilePath;

  beforeEach(() => {
    testFilePath = path.join(__dirname, 'test_output_' + Date.now() + '.txt');
  });

  afterEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it('should save basic content correctly', () => {
    const content = "Hello,  World!  ";
    const expected = "Hello, World!";
    saveContentToFile(content, testFilePath);

    const result = fs.readFileSync(testFilePath, 'utf8').trim();
    expect(result).toBe(expected);
  });

  it('should handle multiple spaces and empty lines correctly', () => {
    const content = `

        This is a    test.

        Another line.      
        `;
    const expected = "This is a test. Another line.";
    saveContentToFile(content, testFilePath);

    const result = fs.readFileSync(testFilePath, 'utf8').trim();
    expect(result).toBe(expected);
  });

  it('should handle only whitespace correctly', () => {
    const content = "    \n  \n   ";
    const expected = "";
    saveContentToFile(content, testFilePath);

    const result = fs.readFileSync(testFilePath, 'utf8').trim();
    expect(result).toBe(expected);
  });

  it('should handle empty content correctly', () => {
    const content = "";
    const expected = "";
    saveContentToFile(content, testFilePath);

    const result = fs.readFileSync(testFilePath, 'utf8').trim();
    expect(result).toBe(expected);
  });

  it('should handle mixed whitespace correctly', () => {
    const content = "Alpha\t\tBeta\nGamma\r\n   Delta";
    const expected = "Alpha Beta Gamma Delta";
    saveContentToFile(content, testFilePath);

    const result = fs.readFileSync(testFilePath, 'utf8').trim();
    expect(result).toBe(expected);
  });
});
