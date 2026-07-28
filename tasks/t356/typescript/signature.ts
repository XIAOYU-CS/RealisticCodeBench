interface Candle {
  open: number;
  close: number;
}

interface ConsecutiveCandlesResult {
  bullish: boolean;
  bearish: boolean;
}

/**
 * Detect consecutive candle indicator to identify continuous bullish or bearish trends
 *
 * @param candles - Candle data array
 * @param candles[].open - Opening price
 * @param candles[].close - Closing price
 * @param numConsecutive - Number of consecutive candles to check
 * @param tolerance - Tolerance ratio, maximum ratio of reverse candle body relative to previous candle body
 *
 * @returns Detection result
 * @returns Whether continuous bullish condition is met
 * @returns Whether continuous bearish condition is met
 */
function consecutiveCandlesIndicator(
  candles: Candle[],
  numConsecutive: number,
  tolerance: number = 0
): ConsecutiveCandlesResult {}