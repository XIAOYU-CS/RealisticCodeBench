describe('sortDictsByFields', () => {
    let testData;

    beforeEach(() => {
        testData = [
            { name: 'Alice', age: 30, salary: 50000 },
            { name: 'Bob', age: 25, salary: 60000 },
            { name: 'Charlie', age: 35, salary: 45000 },
            { name: 'David', age: 30, salary: 55000 },
            { name: 'Eve', age: 28 }
        ];
    });

    test('should sort by single field in ascending order', () => {
        const result = sortDictsByFields(
            testData,
            [['age', true]],
            'default',
            0
        );
        const ages = result.map(item => item.age);
        expect(ages).toEqual([25, 28, 30, 30, 35]);
        const eveRecord = result.find(item => item.name === 'Eve');
        expect(eveRecord.age).toBe(28);
    });

    test('should sort by single field in descending order', () => {
        const testDataSmall = [
            { name: 'A', salary: 100 },
            { name: 'B', salary: 200 },
            { name: 'C' }
        ];

        const result = sortDictsByFields(
            testDataSmall,
            [['salary', false]],
            'default',
            0
        );
        const names = result.map(item => item.name);
        expect(names).toEqual(['B', 'A', 'C']);
    });

    test('should sort by multiple fields with priority', () => {
        const result = sortDictsByFields(
            testData,
            [['age', true]],
            'default',
            0
        );
        const namesInOrder = result.map(item => item.name);
        expect(namesInOrder).toEqual(['Bob', 'Eve', 'Alice', 'David', 'Charlie']);
    });

    test('should handle missing field strategy "first"', () => {
        const result = sortDictsByFields(
            testData,
            [['salary', true]],
            'first'
        );
        expect(result[0].name).toBe('Eve');
    });

    test('should handle missing field strategy "last"', () => {
        const result = sortDictsByFields(
            testData,
            [['salary', true]],
            'last'
        );
        expect(result[result.length - 1].name).toBe('Eve');
    });

    test('should handle empty list', () => {
        const result = sortDictsByFields(
            [],
            [['age', true]],
            'default'
        );
        expect(result).toEqual([]);
    });

    test('should sort string fields in ascending order', () => {
        const result = sortDictsByFields(
            testData,
            [['name', true]],
            'default'
        );

        const names = result.map(item => item.name);
        expect(names).toEqual(['Alice', 'Bob', 'Charlie', 'David', 'Eve']);
    });

    test('should handle multiple sort fields correctly', () => {
        const result = sortDictsByFields(
            testData,
            [['age', true], ['salary', false]],
            'default',
            0
        );

        const namesInOrder = result.map(item => item.name);
        expect(namesInOrder).toEqual(['Bob', 'Eve', 'David', 'Alice', 'Charlie']);
    });
});