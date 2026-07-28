describe('TestFormatStr', () => {
    it('test_simple_string', () => {
        const inputStr = "Hello, World!";
        const expectedOutput = "> Hello, World!";
        expect(formatStr(inputStr)).toBe(expectedOutput);
    });

    it('test_multiline_string', () => {
        const inputStr = "Line 1\nLine 2\nLine 3";
        const expectedOutput = "> Line 1\n> Line 2\n> Line 3";
        expect(formatStr(inputStr)).toBe(expectedOutput);
    });

    it('test_code_block_delimiters_even', () => {
        const inputStr = "Some code:\n```\nprint('Hello')\n```";
        const expectedOutput = "> Some code:\n> ```\n> print('Hello')\n> ```";
        expect(formatStr(inputStr)).toBe(expectedOutput);
    });

    it('test_code_block_delimiters_odd', () => {
        const inputStr = "Some code:\n```\nprint('Hello')";
        const expectedOutput = "> Some code:\n> ```\n> print('Hello')\n> ```";
        expect(formatStr(inputStr)).toBe(expectedOutput);
    });

    it('test_non_string_input', () => {
        const inputValue = 123;
        const expectedOutput = "> 123";
        expect(formatStr(inputValue)).toBe(expectedOutput);
    });
});