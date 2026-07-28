describe('method_arg_type_check', () => {
    test('should pass when arguments match expected types', () => {
        const method = (str: string, num: number) => {};
        method_arg_type_check(method, 'test', 42, { expectedTypes: { str: 'string', num: 'number' } });
    });

    test('should fail when an argument does not match the expected type', () => {
        const method = (str: string, num: number) => {};
        expect(() => method_arg_type_check(method, 'test', 'not a number', { expectedTypes: { str: 'string', num: 'number' } })).toThrowError('Argument \'num\' must be of type number, but got string');
    });

    test('should handle optional parameters correctly', () => {
        const method = (str: string, num?: number) => {};
        method_arg_type_check(method, 'test', { expectedTypes: { str: 'string', num: 'number' } }); // Should pass
        method_arg_type_check(method, 'test', 42, { expectedTypes: { str: 'string', num: 'number' } }); // Should also pass
    });

    test('should ignore excluded parameters', () => {
        const method = (str: string, num: number) => {};
        method_arg_type_check(method, 123, 42, { exclude: ['str'], expectedTypes: { str: 'string', num: 'number' } });
    });

    test('should not mutate excluded parameters', () => {
        const method = (str: string, num: number) => {};
        const exclude = ['str'];
        method_arg_type_check(method, 123, 42, { exclude, expectedTypes: { str: 'string', num: 'number' } });
        expect(exclude).toEqual(['str']);
    });
});
