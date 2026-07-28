package org.real.temp;

import java.util.*;

public class Answer {

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
            List<Map<String, Double>> candles, int numConsecutive, double tolerance) {

        Map<String, Boolean> result = new HashMap<>();

        if (candles == null || candles.size() < numConsecutive) {
            result.put("bullish", false);
            result.put("bearish", false);
            return result;
        }

        // Get latest candles
        List<Map<String, Double>> latestCandles = new ArrayList<>();
        int startIndex = candles.size() - numConsecutive;
        for (int i = startIndex; i < candles.size(); i++) {
            latestCandles.add(candles.get(i));
        }

        int bullishViolations = 0; // Violations in bullish trend (bearish candles)
        int bearishViolations = 0; // Violations in bearish trend (bullish candles)

        for (int i = 0; i < latestCandles.size(); i++) {
            Map<String, Double> candle = latestCandles.get(i);
            double bodySize = Math.abs(candle.get("close") - candle.get("open"));
            boolean isBullish = candle.get("close") > candle.get("open");

            // Check bearish candles in bullish trend
            if (!isBullish) {
                boolean countsAsViolation = true;

                if (tolerance > 0 && i > 0) {
                    Map<String, Double> prevCandle = latestCandles.get(i - 1);
                    double prevBody = Math.abs(prevCandle.get("close") - prevCandle.get("open"));
                    if (prevBody > 0) {
                        double reverseRatio = bodySize / prevBody;
                        countsAsViolation = reverseRatio > tolerance;
                    }
                }

                if (countsAsViolation) {
                    bullishViolations++;
                }
            }

            if (isBullish) {
                boolean countsAsViolation = true;

                if (tolerance > 0 && i > 0) {
                    Map<String, Double> prevCandle = latestCandles.get(i - 1);
                    double prevBody = Math.abs(prevCandle.get("close") - prevCandle.get("open"));
                    if (prevBody > 0) {
                        double reverseRatio = bodySize / prevBody;
                        countsAsViolation = reverseRatio > tolerance;
                    }
                }

                if (countsAsViolation) {
                    bearishViolations++;
                }
            }
        }

        int maxViolations = tolerance > 0 ? 1 : 0;

        result.put("bullish", bullishViolations <= maxViolations);
        result.put("bearish", bearishViolations <= maxViolations);

        return result;
    }

    /**
     * Detect consecutive candle indicator with default tolerance (0)
     *
     * @param candles Candle data array
     * @param numConsecutive Number of consecutive candles to check
     * @return Detection result containing:
     *         - bullish (Boolean): Whether continuous bullish condition is met
     *         - bearish (Boolean): Whether continuous bearish condition is met
     */
    public static Map<String, Boolean> consecutiveCandlesIndicator(
            List<Map<String, Double>> candles, int numConsecutive) {
        return consecutiveCandlesIndicator(candles, numConsecutive, 0.0);
    }
}