describe('TestNGramModelProb', () => {
  test('test_unigram_probability', () => {
    const context = [];
    const word = 'hello';
    const result = prob(context, word);
    expect(result).toBeCloseTo(0.5, 5);
  });

  test('test_bigram_probability', () => {
    const context = ['hello'];
    const word = 'world';
    const result = prob(context, word);
    expect(result).toBeCloseTo(0.8, 5);
  });

  test('test_trigram_probability', () => {
    const context = ['hello', 'world'];
    const word = 'test';
    const result = prob(context, word);
    expect(result).toBeCloseTo(0.75, 5);
  });

  test('test_zero_probability_unknown_word', () => {
    const context = ['hello'];
    const word = 'unknown';
    const result = prob(context, word);
    expect(result).toBe(0.0);
  });

  test('test_zero_probability_unknown_context', () => {
    const context = ['unknown'];
    const word = 'world';
    const result = prob(context, word);
    expect(result).toBe(0.0);
  });
});