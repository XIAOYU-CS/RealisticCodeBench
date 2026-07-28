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