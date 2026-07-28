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
function consecutiveCandlesIndicator(candles, numConsecutive, tolerance = 0) {}