#include <vector>
#include <map>
#include <cmath>
#include <string>

std::map<std::string, bool> consecutive_candles_indicator(const std::vector<std::map<std::string, double>>& candles,
                                                          int num_consecutive,
                                                          double tolerance = 0) {
    if (candles.size() < num_consecutive) {
        return {{"bullish", false}, {"bearish", false}};
    }

    std::vector<std::map<std::string, double>> latest_candles(candles.end() - num_consecutive, candles.end());

    int bullish_violations = 0;
    int bearish_violations = 0;

    for (size_t i = 0; i < latest_candles.size(); ++i) {
        const auto& candle = latest_candles[i];
        double body_size = std::abs(candle.at("close") - candle.at("open"));
        bool is_bullish = candle.at("close") > candle.at("open");

        if (!is_bullish) {
            bool counts_as_violation = true;

            if (tolerance > 0 && i > 0) {
                double prev_body = std::abs(latest_candles[i - 1].at("close") - latest_candles[i - 1].at("open"));
                if (prev_body > 0) {
                    double reverse_ratio = body_size / prev_body;
                    counts_as_violation = reverse_ratio > tolerance;
                }
            }

            if (counts_as_violation) {
                bullish_violations += 1;
            }
        }

        if (is_bullish) {
            bool counts_as_violation = true;

            if (tolerance > 0 && i > 0) {
                double prev_body = std::abs(latest_candles[i - 1].at("close") - latest_candles[i - 1].at("open"));
                if (prev_body > 0) {
                    double reverse_ratio = body_size / prev_body;
                    counts_as_violation = reverse_ratio > tolerance;
                }
            }

            if (counts_as_violation) {
                bearish_violations += 1;
            }
        }
    }

    int max_violations = tolerance > 0 ? 1 : 0;

    return {{"bullish", bullish_violations <= max_violations}, {"bearish", bearish_violations <= max_violations}};
}
