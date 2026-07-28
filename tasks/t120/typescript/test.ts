describe('TestModExp', () => {
  it('test_case_1', () => {
    expect(modExp(2, 10, 1000)).toBe(24);
  });

  it('test_case_2', () => {
    expect(modExp(3, 7, 50)).toBe(37);
  });

  it('test_case_3', () => {
    expect(modExp(5, 0, 13)).toBe(1);
  });

  it('test_case_4', () => {
    expect(modExp(7, 5, 20)).toBe(7);
  });

  it('test_case_5', () => {
    expect(modExp(10, 5, 6)).toBe(4);
  });
});