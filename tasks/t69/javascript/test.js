describe('methodArgTypeCheck', () => {
  it('should not throw an error if the arguments match the expected types', () => {
    function sampleMethod(a, b, c) {}

    expect(() => {
      methodArgTypeCheck(sampleMethod, 1, 'hello', 3.14, {
        expectedTypes: { a: 'number', b: 'string', c: 'number' },
      });
    }).not.toThrowError();
  });

  it('should throw an error if the arguments do not match the expected types', () => {
    function sampleMethod(a, b) {}

    expect(() => {
      methodArgTypeCheck(sampleMethod, 'not_an_int', 'hello', {
        expectedTypes: { a: 'number', b: 'string' },
      });
    }).toThrowError('Argument a must be of type number, but got string');
  });

  it('should ignore excluded parameters', () => {
    function sampleMethod(a, b) {}

    expect(() => {
      methodArgTypeCheck(sampleMethod, 'not_an_int', 'hello', {
        exclude: ['a'],
        expectedTypes: { a: 'number', b: 'string' },
      });
    }).not.toThrowError();
  });

  it('should handle default parameters correctly', () => {
    function sampleMethod(a, b = 'default', c = 1.0) {}

    expect(() => {
      methodArgTypeCheck(sampleMethod, 42, {
        expectedTypes: { a: 'number', b: 'string', c: 'number' },
      });
    }).not.toThrowError();
  });

  it('should not mutate excluded parameters', () => {
    function sampleMethod(a, b) {}
    const exclude = ['a'];

    expect(() => {
      methodArgTypeCheck(sampleMethod, 'not_an_int', 'hello', {
        exclude,
        expectedTypes: { a: 'number', b: 'string' },
      });
    }).not.toThrowError();
    expect(exclude).toEqual(['a']);
  });
});
