describe('TestSplitIntoSentences', () => {
  it('test_basic_splitting', () => {
    const text = "Hello world! How are you? I am fine.";
    const expected = ["Hello world!", "How are you?", "I am fine."];
    const result = splitTextIntoCleanSentences(text);
    expect(result).toEqual(expected);
  });

  it('test_complex_punctuation', () => {
    const text = 'He said, This is amazing! Then he left.';
    const expected = ['He said, This is amazing!', "Then he left."];
    const result = splitTextIntoCleanSentences(text);
    expect(result).toEqual(expected);
  });

  it('test_with_no_punctuation', () => {
    const text = "Hello world how are you";
    const expected = ["Hello world how are you"];
    const result = splitTextIntoCleanSentences(text);
    expect(result).toEqual(expected);
  });

  it('test_empty_string', () => {
    const text = "";
    const expected = [];
    const result = splitTextIntoCleanSentences(text);
    expect(result).toEqual(expected);
  });

  it('test_invalid_input', () => {
    expect(() => splitTextIntoCleanSentences(null as unknown as string)).toThrow('Input must be a string.');
  });
});
