from typing import List, Dict, Any, Union


def consecutive_candles_indicator(candles: List[Dict[str, float]],
                                  num_consecutive: int,
                                  tolerance: float = 0) -> Dict[str, bool]:
    """Detect consecutive candle indicator to identify continuous bullish or bearish trends

    Args:
        candles (list[dict]): Candle data array
        num_consecutive (int): Number of consecutive candles to check
        tolerance (float, optional): Tolerance ratio, maximum ratio of reverse candle body
                                   relative to previous candle body. Defaults to 0.

    Returns:
        dict: Detection result containing:
            - bullish (bool): Whether continuous bullish condition is met
            - bearish (bool): Whether continuous bearish condition is met
    """

    if len(candles) < num_consecutive:
        return {'bullish': False, 'bearish': False}

    latest_candles = candles[-num_consecutive:]

    bullish_violations = 0  # Violations in bullish trend (bearish candles)
    bearish_violations = 0  # Violations in bearish trend (bullish candles)

    for i, candle in enumerate(latest_candles):
        body_size = abs(candle['close'] - candle['open'])
        is_bullish = candle['close'] > candle['open']

        # Check bearish candles in bullish trend
        if not is_bullish:
            counts_as_violation = True

            if tolerance > 0 and i > 0:
                prev_body = abs(latest_candles[i - 1]['close'] - latest_candles[i - 1]['open'])
                if prev_body > 0:
                    reverse_ratio = body_size / prev_body
                    counts_as_violation = reverse_ratio > tolerance

            if counts_as_violation:
                bullish_violations += 1

        if is_bullish:
            counts_as_violation = True

            if tolerance > 0 and i > 0:
                prev_body = abs(latest_candles[i - 1]['close'] - latest_candles[i - 1]['open'])
                if prev_body > 0:
                    reverse_ratio = body_size / prev_body
                    counts_as_violation = reverse_ratio > tolerance

            if counts_as_violation:
                bearish_violations += 1

    max_violations = 1 if tolerance > 0 else 0

    return {
        'bullish': bullish_violations <= max_violations,
        'bearish': bearish_violations <= max_violations
    }