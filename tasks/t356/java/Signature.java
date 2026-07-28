/**
 * Detect consecutive candle indicator to identify continuous bullish or bearish trends
 *
 * @param candles Candle data array
 * @param numConsecutive Number of consecutive candles to check
 * @param tolerance Tolerance ratio, maximum ratio of reverse candle body
 *                  relative to previous candle body. Defaults to 0.
 * @return Detection result containing:
 *         - bullish (Boolean): Whether continuous bullish condition is met
 *         - bearish (Boolean): Whether continuous bearish condition is met
 */
public static Map<String, Boolean> consecutiveCandlesIndicator(
        List<Map<String, Double>> candles, int numConsecutive, double tolerance) {}