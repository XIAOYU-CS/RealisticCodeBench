describe('parseTypeHint', () => {
    test('basic types', () => {
        expect(parseTypeHint('int')).toEqual(['int']);
    });

    test('list type', () => {
        expect(parseTypeHint('List[int]')).toEqual(['List', 'int']);
    });

    test('union type', () => {
        expect(parseTypeHint('Union[str, float]')).toEqual(['Union', 'str', 'float']);
    });

    test('tuple type', () => {
        expect(parseTypeHint('Tuple[str, int, float]')).toEqual(['Tuple', 'str', 'int', 'float']);
    });

    test('complex type', () => {
        expect(parseTypeHint('List[Union[int, float], Tuple[str, int]]')).toEqual([
            'List',
            'Union',
            'int',
            'float',
            'Tuple',
            'str',
            'int',
        ]);
    });
});
