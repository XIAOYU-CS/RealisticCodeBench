const fsForTest = require('fs');
const osForTest = require('os');
const pathForTest = require('path');

const fixturePath = (name: string): string => pathForTest.resolve(process.cwd(), '..', 'python', 'test_case', 't249', name);

describe('TestExtractTextFromPDF', () => {
  it('should handle an empty file correctly', async () => {
    const pdfPath = 'E:/code/code_back/python_project/RealisticEval-Data/envs/python/test_case/t249/testcase01.pdf';
    const expected = ' \n';
    const output = await extractTextFromPdf(pdfPath);
    expect(output).toEqual(expected);
  });

  it('should handle a normal file correctly', async () => {
    const pdfPath = 'E:/code/code_back/python_project/RealisticEval-Data/envs/python/test_case/t249/testcase02.pdf';
    const expected = '11111  \n';
    const output = await extractTextFromPdf(pdfPath);
    expect(output).toEqual(expected);
  });

  it('should handle a file with more text correctly', async () => {
    const pdfPath = 'E:/code/code_back/python_project/RealisticEval-Data/envs/python/test_case/t249/testcase03.pdf';
    const expected = '11111  \n22222  \n33333  \n44444  \n';
    const output = await extractTextFromPdf(pdfPath);
    expect(output).toEqual(expected);
  });

  it('should handle a local file path with spaces', async () => {
    const tempDir = fsForTest.mkdtempSync(pathForTest.join(osForTest.tmpdir(), 'pdf-text-'));
    const pdfPath = pathForTest.join(tempDir, 'fixture with spaces.pdf');
    try {
      fsForTest.copyFileSync(fixturePath('testcase02.pdf'), pdfPath);
      const output = await extractTextFromPdf(pdfPath);
      expect(output).toEqual('11111  \n');
    } finally {
      fsForTest.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should reject a missing file path', async () => {
    await expect(extractTextFromPdf(fixturePath('missing.pdf'))).rejects.toThrow();
  });
});
