describe('TestStrongPassword', () => {
  it('test valid password', () => {
    expect(isStrongPassword("StrongPass1")).toBe(true);
  });

  it('test missing lowercase', () => {
    expect(isStrongPassword("STRONGPASS1")).toBe(false);
  });

  it('test missing uppercase', () => {
    expect(isStrongPassword("strongpass1")).toBe(false);
  });

  it('test missing number', () => {
    expect(isStrongPassword("StrongPassword")).toBe(false);
  });

  it('test too short', () => {
    expect(isStrongPassword("Short1")).toBe(false);
  });

  it('test valid with special characters', () => {
    expect(isStrongPassword("Strong!Password1")).toBe(true);
  });
});