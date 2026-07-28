describe('formatDate', () => {
  let testDate: Date;

  beforeEach(() => {
    testDate = new Date(2023, 11, 25, 14, 30, 45);
  });

  test('should format date with YYYY-MM-DD template', () => {
    const result: string = formatDate(testDate, 'YYYY-MM-DD');
    expect(result).toBe('2023-12-25');
  });

  test('should format date with MM/DD/YYYY template', () => {
    const result: string = formatDate(testDate, 'MM/DD/YYYY');
    expect(result).toBe('12/25/2023');
  });

  test('should handle 12-hour format correctly for AM time', () => {
    const amDate: Date = new Date(2023, 11, 25, 9, 15, 30);
    const result: string = formatDate(amDate, 'hh:mm:ss A');
    expect(result).toBe('09:15:30 AM');
  });

  test('should handle 12-hour format correctly for PM time', () => {
    const pmDate: Date = new Date(2023, 11, 25, 22, 45, 15);
    const result: string = formatDate(pmDate, 'hh:mm:ss A');
    expect(result).toBe('10:45:15 PM');
  });

  test('should handle 24-hour format correctly', () => {
    const result: string = formatDate(testDate, 'HH:mm:ss');
    expect(result).toBe('14:30:45');
  });
});