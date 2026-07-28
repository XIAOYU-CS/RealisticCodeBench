describe('generateRandomSubsets', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('basic integer range', () => {
        const mockRandomValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
        let randomCallCount = 0;
        jest.spyOn(global.Math, 'random').mockImplementation(() => {
            return mockRandomValues[randomCallCount++ % mockRandomValues.length];
        });

        const result = generateRandomSubsets(1, 10, 3, 2, { step: 1 });
        expect(result).toHaveLength(2);
        result.forEach(subset => {
            expect(subset).toHaveLength(3);
            subset.forEach(item => {
                expect(item).toBeGreaterThanOrEqual(1);
                expect(item).toBeLessThan(10);
            });
        });
    });

    test('with custom data source', () => {
        const data = ['a', 'b', 'c', 'd', 'e', 'f'];
        jest.spyOn(global.Math, 'random').mockImplementation(() => 0.5);
        const result = generateRandomSubsets<string>(0, 1, 2, 3, { dataSource: data });
        expect(result).toHaveLength(3);
        result.forEach(subset => {
            expect(subset).toHaveLength(2);
            subset.forEach(item => {
                expect(data).toContain(item);
            });
        });
    });

    test('no duplicates mode', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
        const result = generateRandomSubsets(1, 6, 2, 3, { allowDuplicates: false });
        expect(result).toHaveLength(3);
        const subsetStrings = result.map(subset =>
            JSON.stringify([...subset].sort((a, b) => {
                if (typeof a === 'number' && typeof b === 'number') {
                    return a - b;
                }
                return String(a).localeCompare(String(b));
            }))
        );
        const uniqueSubsetStrings = [...new Set(subsetStrings)];
        expect(uniqueSubsetStrings).toHaveLength(subsetStrings.length);
        consoleWarnSpy.mockRestore();
    });

    test('shuffle mode', () => {
        const mockRandomValues = [0.1, 0.9, 0.3, 0.7, 0.2, 0.8, 0.4, 0.6];
        let randomCallCount = 0;
        jest.spyOn(global.Math, 'random').mockImplementation(() => {
            return mockRandomValues[randomCallCount++ % mockRandomValues.length];
        });
        const result1 = generateRandomSubsets(1, 10, 4, 1, { shuffle: true });
        randomCallCount = 0;
        const result2 = generateRandomSubsets(1, 10, 4, 1, { shuffle: false });
        expect(result1).toHaveLength(1);
        expect(result2).toHaveLength(1);
        expect(result1[0]).toHaveLength(4);
        expect(result2[0]).toHaveLength(4);
        const sortedResult1 = [...result1[0]].sort((a, b) => a - b);
        expect(result2[0]).toEqual(sortedResult1);
    });

    test('exact fit range returns only possible subset', () => {
        const result = generateRandomSubsets(2, 5, 3, 4);

        expect(result).toEqual([[2, 3, 4], [2, 3, 4], [2, 3, 4], [2, 3, 4]]);
    });

});
