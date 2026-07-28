describe('consecutiveCandlesIndicator', () => {
  test('should detect continuous bullish trend', () => {
    const candles = [
      { open: 100, close: 105 },
      { open: 105, close: 110 },
      { open: 110, close: 115 }
    ];
    const result = consecutiveCandlesIndicator(candles, 3);
    expect(result.bullish).toBe(true);
    expect(result.bearish).toBe(false);
  });

  test('should detect continuous bearish trend', () => {
    const candles = [
      { open: 115, close: 110 },
      { open: 110, close: 105 },
      { open: 105, close: 100 }
    ];
    const result = consecutiveCandlesIndicator(candles, 3);
    expect(result.bullish).toBe(false);
    expect(result.bearish).toBe(true);
  });

  test('should return false when insufficient data', () => {
    const candles = [
      { open: 100, close: 105 }
    ];
    const result = consecutiveCandlesIndicator(candles, 3);
    expect(result.bullish).toBe(false);
    expect(result.bearish).toBe(false);
  });

  test('should handle tolerance with minor violations in bullish trend', () => {
    const candles = [
      { open: 100, close: 105 },
      { open: 105, close: 103 },
      { open: 103, close: 108 }
    ];
    const result = consecutiveCandlesIndicator(candles, 3, 0.3);
    expect(result.bullish).toBe(true);
    expect(result.bearish).toBe(false);
  });

  test('should detect violations without tolerance', () => {
    const candles = [
      { open: 100, close: 105 },
      { open: 105, close: 103 },
      { open: 103, close: 108 }
    ];
    const result = consecutiveCandlesIndicator(candles, 3, 0);
    expect(result.bullish).toBe(false);
    expect(result.bearish).toBe(false);
  });
});