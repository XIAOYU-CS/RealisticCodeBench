describe('TestReadTsvFromStdin', () => {
    beforeEach(() => {
        process.stdin.setEncoding('utf8');
    });

    test('test basic TSV input', () => {
        const mockStdin = 'col1\tcol2\tcol3\nval1\tval2\tval3\n';
        process.stdin.emit('data', mockStdin);
        process.stdin.emit('end');
        const expectedOutput = [['col1', 'col2', 'col3'], ['val1', 'val2', 'val3']];
        expect(readTSVFromStdin()).toEqual(expectedOutput);
    });

    test('test single column', () => {
        const mockStdin = 'col1\nval1\nval2\n';
        process.stdin.emit('data', mockStdin);
        process.stdin.emit('end');

        const expectedOutput = [['col1'], ['val1'], ['val2']];
        expect(readTSVFromStdin()).toEqual(expectedOutput);
    });

    test('test all rows empty', () => {
        const mockStdin = 'col1\tcol2\tcol3\n\n\n';
        process.stdin.emit('data', mockStdin);
        process.stdin.emit('end');

        const expectedOutput = [['col1', 'col2', 'col3'], ['', '', ''], ['', '', '']];
        expect(readTSVFromStdin()).toEqual(expectedOutput);
    });

    test('test multiple consecutive tabs', () => {
        const mockStdin = 'col1\t\tcol2\tcol3\nval1\t\tval2\tval3\n';
        process.stdin.emit('data', mockStdin);
        process.stdin.emit('end');

        const expectedOutput = [['col1', '', 'col2', 'col3'], ['val1', '', 'val2', 'val3']];
        expect(readTSVFromStdin()).toEqual(expectedOutput);
    });

    test('test missing columns', () => {
        const mockStdin = 'col1\tcol2\tcol3\nval1\tval2\nval1.1\tval2.1\tval3.1\n';
        process.stdin.emit('data', mockStdin);
        process.stdin.emit('end');

        const expectedOutput = [['col1', 'col2', 'col3'], ['val1', 'val2', ''], ['val1.1', 'val2.1', 'val3.1']];
        expect(readTSVFromStdin()).toEqual(expectedOutput);
    });
});
