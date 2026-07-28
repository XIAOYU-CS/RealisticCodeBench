#include <map>
#include <string>
#include <vector>

/**
 * @brief Detect consecutive candle indicator to identify continuous bullish or bearish trends.
 *
 * @param candles Candle data array with "open" and "close" values.
 * @param num_consecutive Number of consecutive candles to check.
 * @param tolerance Tolerance ratio for a reverse candle body relative to the previous body.
 * @return std::map<std::string, bool> Detection result with "bullish" and "bearish" keys.
 */
std::map<std::string, bool> consecutive_candles_indicator(
    const std::vector<std::map<std::string, double>>& candles,
    int num_consecutive,
    double tolerance = 0
);
