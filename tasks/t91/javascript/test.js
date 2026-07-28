import fs from 'fs'
describe('TestGetMinDistance', () => {
    beforeEach(() => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => '');
    });

    afterEach(() => {
        fs.readFileSync.mockRestore();
    });

    test('test simple case', () => {
        fs.readFileSync.mockImplementation(() => {
            return [
                "hello world",
                "hello hello world",
                "world hello"
            ].join('\n');
        });

        expect(getMinDistance('dummy_file.txt', 'hello', 'world')).toEqual([0, 1]);
    });

    test('test multiple lines', () => {
        fs.readFileSync.mockImplementation(() => {
            return [
                "hello planet",
                "world hello planet",
                "hello world planet"
            ].join('\n');
        });

        expect(getMinDistance('dummy_file.txt', 'hello', 'world')).toEqual([1, 1]);
    });

    test('test large distance', () => {
        fs.readFileSync.mockImplementation(() => {
            return "hello a b c d e f g h i j k l m n o p q r s t u v w x y z world";
        });

        expect(getMinDistance('dummy_file.txt', 'hello', 'world')).toEqual([0, 27]);
    });

    test('test adjacent words', () => {
        fs.readFileSync.mockImplementation(() => {
            return [
                "hello world",
                "hello hello world world",
                "world hello"
            ].join('\n');
        });

        expect(getMinDistance('dummy_file.txt', 'hello', 'world')).toEqual([0, 1]);
    });

    test('test no line contains both words', () => {
        fs.readFileSync.mockImplementation(() => {
            return [
                "hello planet",
                "world galaxy"
            ].join('\n');
        });

        expect(getMinDistance('dummy_file.txt', 'hello', 'world')).toEqual([null, null]);
    });
});
