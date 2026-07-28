const fs = require('fs');

describe('TestDataframeToMarkdown', () => {
    beforeEach(() => {
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should write the correct markdown to a file', () => {
        const data = [{ Name: 'Alice', Age: 25 }, { Name: 'Bob', Age: 30 }];
        const expectedMarkdown = "| Name   |   Age |\n|:-------|------:|\n| Alice  |    25 |\n| Bob    |    30 |";
        const result = dataframeToMarkdown(data, 'dummy_path.md');
        expect(result).toEqual(expectedMarkdown);
    });

    it('should handle an empty DataFrame correctly', () => {
        const expectedMarkdown = "";
        const result = dataframeToMarkdown([], 'dummy_path.md');
        expect(result).toEqual(expectedMarkdown);
    });

    it('should handle a single-row DataFrame correctly', () => {
        const data = [{ Name: 'Alice', Age: 30 }];
        const expectedMarkdown = "| Name   |   Age |\n|:-------|------:|\n| Alice  |    30 |";
        const result = dataframeToMarkdown(data, 'dummy_path.md');
        expect(result).toEqual(expectedMarkdown);
    });

    it('should handle non-string columns correctly', () => {
        const data = [{ Name: 'Alice', Age: 25, Height: 5.5 }, { Name: 'Bob', Age: 30, Height: 6.0 }];
        const expectedMarkdown = '| Name   |   Age |   Height |\n|:-------|------:|---------:|\n| Alice  |    25 |      5.5 |\n| Bob    |    30 |      6   |';
        const result = dataframeToMarkdown(data, 'dummy_path.md');
        expect(result).toEqual(expectedMarkdown);
    });

    it('should handle special characters in DataFrame correctly', () => {
        const data = [{ Name: 'Alice', Comments: 'Good@Work!' }, { Name: 'Bob', Comments: 'Excellent & Commendable' }];
        const expectedMarkdown = '| Name   | Comments                |\n|:-------|:------------------------|\n| Alice  | Good@Work!              |\n| Bob    | Excellent & Commendable |';
        const result = dataframeToMarkdown(data, 'dummy_path.md');
        expect(result).toEqual(expectedMarkdown);
    });
});
