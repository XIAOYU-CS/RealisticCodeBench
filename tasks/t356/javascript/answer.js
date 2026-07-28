/**
 * Detect consecutive candle indicator to identify continuous bullish or bearish trends
 *
 * @param {Array<Object>} candles - Candle data array
 * @param {Object} candles[].open - Opening price
 * @param {Object} candles[].close - Closing price
 * @param {number} numConsecutive - Number of consecutive candles to check
 * @param {number} [tolerance=0] - Tolerance ratio, maximum ratio of reverse candle body relative to previous candle body
 *
 * @returns {Object} Detection result
 * @returns {boolean} returns.bullish - Whether continuous bullish condition is met
 * @returns {boolean} returns.bearish - Whether continuous bearish condition is met
 */
function consecutiveCandlesIndicator(candles, numConsecutive, tolerance = 0) {
  if (candles.length < numConsecutive) {
    return { bullish: false, bearish: false };
  }

  const latestCandles = candles.slice(-numConsecutive);

  let bullishViolations = 0;  // Violations in bullish trend (bearish candles)
  let bearishViolations = 0;  // Violations in bearish trend (bullish candles)

  for (let i = 0; i < latestCandles.length; i++) {
    const candle = latestCandles[i];
    const bodySize = Math.abs(candle.close - candle.open);
    const isBullish = candle.close > candle.open;

    // Check bearish candles in bullish trend
    if (!isBullish) {
      let countsAsViolation = true;

      if (tolerance > 0 && i > 0) {
        const prevBody = Math.abs(latestCandles[i-1].close - latestCandles[i-1].open);
        if (prevBody > 0) {
          const reverseRatio = bodySize / prevBody;
          countsAsViolation = reverseRatio > tolerance;
        }
      }

      if (countsAsViolation) {
        bullishViolations++;
      }
    }

    if (isBullish) {
      let countsAsViolation = true;

      if (tolerance > 0 && i > 0) {
        const prevBody = Math.abs(latestCandles[i-1].close - latestCandles[i-1].open);
        if (prevBody > 0) {
          const reverseRatio = bodySize / prevBody;
          countsAsViolation = reverseRatio > tolerance;
        }
      }

      if (countsAsViolation) {
        bearishViolations++;
      }
    }
  }

  const maxViolations = tolerance > 0 ? 1 : 0;

  return {
    bullish: bullishViolations <= maxViolations,
    bearish: bearishViolations <= maxViolations
  };
}