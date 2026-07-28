describe('TestGetMinDistance', () => {
    it('test basic functionality with expected input', () => {
        const mockContent = "hello world\napple banana apple\norange apple banana";
        jest.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

        const [lineNumber, distance] = getMinSeqNumAndDistance('dummy_file.txt', 'apple', 'banana');
        expect([lineNumber, distance]).toEqual([2, 1]);
        jest.restoreAllMocks();
    });

    it('test case where one or both words are not present', () => {
        const mockContent = "apple orange pear\norange pear apple";
        jest.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

        const [lineNumber, distance] = getMinSeqNumAndDistance('dummy_file.txt', 'apple', 'banana');
        expect([lineNumber, distance]).toEqual([null, Infinity]);
        jest.restoreAllMocks();
    });

    it('test an empty file', () => {
        const mockContent = '';
        jest.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

        const [lineNumber, distance] = getMinSeqNumAndDistance('dummy_file.txt', 'apple', 'banana');
        expect([lineNumber, distance]).toEqual([null, Infinity]);
        jest.restoreAllMocks();
    });

    it('test multiple lines with varying distances between words', () => {
        const mockContent = "apple banana\napple orange orange banana\napple orange orange orange banana";
        jest.spyOn(fs, 'readFileSync').mockReturnValue(mockContent);

        const [lineNumber, distance] = getMinSeqNumAndDistance('dummy_file.txt', 'apple', 'banana');
        expect([lineNumber, distance]).toEqual([1, 1]);
        jest.restoreAllMocks();
    });

    it('test missing file returns infinite distance', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
            throw new Error('missing file');
        });

        const [lineNumber, distance] = getMinSeqNumAndDistance('missing.txt', 'apple', 'banana');
        expect([lineNumber, distance]).toEqual([null, Infinity]);
        jest.restoreAllMocks();
    });
});
