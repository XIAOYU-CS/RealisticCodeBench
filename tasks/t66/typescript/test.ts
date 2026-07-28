describe('parseDurationStringToTimedelta', () => {
  it('should convert "1d 2h 3m 4s 500ms" to correct timedelta', () => {
    const result = parseDurationStringToTimedelta("1d 2h 3m 4s 500ms");
    expect(result).toEqual({
      days: 1,
      hours: 2,
      minutes: 3,
      seconds: 4,
      milliseconds: 500
    });
  });

  it('should convert "2h 30m" to correct timedelta', () => {
    const result = parseDurationStringToTimedelta("2h 30m");
    expect(result).toEqual({
      days: 0,
      hours: 2,
      minutes: 30,
      seconds: 0,
      milliseconds: 0
    });
  });

  it('should convert "1s" to correct timedelta', () => {
    const result = parseDurationStringToTimedelta("1s");
    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      milliseconds: 0
    });
  });

  it('should convert "500ms" to correct timedelta', () => {
    const result = parseDurationStringToTimedelta("500ms");
    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 500
    });
  });

  it('should handle empty string', () => {
    const result = parseDurationStringToTimedelta("");
    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    });
  });

  it('should handle invalid input as zero duration', () => {
    expect(parseDurationStringToTimedelta("invalid_input")).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0
    });
  });
});
