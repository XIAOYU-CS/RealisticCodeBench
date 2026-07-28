package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testShouldDetectContinuousBullishTrend() {
        List<Map<String, Double>> candles = new ArrayList<>();
        candles.add(createCandle(100.0, 105.0));
        candles.add(createCandle(105.0, 110.0));
        candles.add(createCandle(110.0, 115.0));
        Map<String, Boolean> result = Answer.consecutiveCandlesIndicator(candles, 3);
        assertTrue(result.get("bullish"));
        assertFalse(result.get("bearish"));
    }

    @Test
    public void testShouldDetectContinuousBearishTrend() {
        List<Map<String, Double>> candles = new ArrayList<>();
        candles.add(createCandle(115.0, 110.0));
        candles.add(createCandle(110.0, 105.0));
        candles.add(createCandle(105.0, 100.0));
        Map<String, Boolean> result = Answer.consecutiveCandlesIndicator(candles, 3);
        assertFalse(result.get("bullish"));
        assertTrue(result.get("bearish"));
    }

    @Test
    public void testShouldReturnFalseWhenInsufficientData() {
        List<Map<String, Double>> candles = new ArrayList<>();
        candles.add(createCandle(100.0, 105.0));
        Map<String, Boolean> result = Answer.consecutiveCandlesIndicator(candles, 3);
        assertFalse(result.get("bullish"));
        assertFalse(result.get("bearish"));
    }

    @Test
    public void testShouldHandleToleranceWithMinorViolationsInBullishTrend() {
        List<Map<String, Double>> candles = new ArrayList<>();
        candles.add(createCandle(100.0, 105.0));
        candles.add(createCandle(105.0, 103.0));
        candles.add(createCandle(103.0, 108.0));
        Map<String, Boolean> result = Answer.consecutiveCandlesIndicator(candles, 3, 0.3);
        assertTrue(result.get("bullish"));
        assertFalse(result.get("bearish"));
    }

    @Test
    public void testShouldDetectViolationsWithoutTolerance() {
        List<Map<String, Double>> candles = new ArrayList<>();
        candles.add(createCandle(100.0, 105.0));
        candles.add(createCandle(105.0, 103.0));
        candles.add(createCandle(103.0, 108.0));
        Map<String, Boolean> result = Answer.consecutiveCandlesIndicator(candles, 3, 0.0);
        assertFalse(result.get("bullish"));
        assertFalse(result.get("bearish"));
    }

    private Map<String, Double> createCandle(double open, double close) {
        Map<String, Double> candle = new HashMap<>();
        candle.put("open", open);
        candle.put("close", close);
        return candle;
    }
}