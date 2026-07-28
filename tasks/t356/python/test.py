import unittest

class TestConsecutiveCandlesIndicator(unittest.TestCase):

    def test_should_detect_continuous_bullish_trend(self):
        candles = [
            {'open': 100, 'close': 105},
            {'open': 105, 'close': 110},
            {'open': 110, 'close': 115}
        ]
        result = consecutive_candles_indicator(candles, 3)
        self.assertTrue(result['bullish'])
        self.assertFalse(result['bearish'])

    def test_should_detect_continuous_bearish_trend(self):
        candles = [
            {'open': 115, 'close': 110},
            {'open': 110, 'close': 105},
            {'open': 105, 'close': 100}
        ]
        result = consecutive_candles_indicator(candles, 3)
        self.assertFalse(result['bullish'])
        self.assertTrue(result['bearish'])

    def test_should_return_false_when_insufficient_data(self):
        candles = [
            {'open': 100, 'close': 105}
        ]
        result = consecutive_candles_indicator(candles, 3)
        self.assertFalse(result['bullish'])
        self.assertFalse(result['bearish'])

    def test_should_handle_tolerance_with_minor_violations_in_bullish_trend(self):
        candles = [
            {'open': 100, 'close': 105},
            {'open': 105, 'close': 103},
            {'open': 103, 'close': 108}
        ]
        result = consecutive_candles_indicator(candles, 3, 0.3)
        self.assertTrue(result['bullish'])
        self.assertFalse(result['bearish'])

    def test_should_detect_violations_without_tolerance(self):
        candles = [
            {'open': 100, 'close': 105},
            {'open': 105, 'close': 103},
            {'open': 103, 'close': 108}
        ]
        result = consecutive_candles_indicator(candles, 3, 0)
        self.assertFalse(result['bullish'])
        self.assertFalse(result['bearish'])