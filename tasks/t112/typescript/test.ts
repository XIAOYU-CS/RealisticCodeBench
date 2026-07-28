describe('TestFormatStr', () => {
  it('test simple string', () => {
    const inputStr = "Hello, World!";
    const expectedOutput = "> Hello, World!";
    expect(formatStr(inputStr)).toEqual(expectedOutput);
  });

  it('test multiline string', () => {
    const inputStr = "Line 1\nLine 2\nLine 3";
    const expectedOutput = "> Line 1\n> Line 2\n> Line 3";
    expect(formatStr(inputStr)).toEqual(expectedOutput);
  });

  it('test code block delimiters even', () => {
    const inputStr = "Some code:\n```\nprint('Hello')\n```";
    const expectedOutput = "> Some code:\n> ```\n> print('Hello')\n> ```";
    expect(formatStr(inputStr)).toEqual(expectedOutput);
  });

  it('test code block delimiters odd', () => {
    const inputStr = "Some code:\n```\nprint('Hello')";
    const expectedOutput = "> Some code:\n> ```\n> print('Hello')\n> ```";
    expect(formatStr(inputStr)).toEqual(expectedOutput);
  });

  it('test non-string input', () => {
    const inputValue = 123;
    const expectedOutput = "> 123";
    expect(formatStr(inputValue)).toEqual(expectedOutput);
  });
});