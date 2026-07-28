describe('TestNGramModelProb', () => {
  it('test_unigram_probability', () => {
    const context: string[] = [];
    const word = 'hello';
    const result = prob(context, word);
    expect(result).toBeCloseTo(0.5, 6);
  });

  it('test_bigram_probability', () => {
    const context: string[] = ['hello'];
    const word = 'world';
    const result = prob(context, word);
    expect(result).toBeCloseTo(0.8, 6);
  });

  it('test_trigram_probability', () => {
    const context: string[] = ['hello', 'world'];
    const word = 'test';
    const result = prob(context, word);
    expect(result).toBeCloseTo(0.75, 6);
  });

  it('test_zero_probability_unknown_word', () => {
    const context: string[] = ['hello'];
    const word = 'unknown';
    const result = prob(context, word);
    expect(result).toBe(0.0);
  });

  it('test_zero_probability_unknown_context', () => {
    const context: string[] = ['unknown'];
    const word = 'world';
    const result = prob(context, word);
    expect(result).toBe(0.0);
  });
});