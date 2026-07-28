#include <algorithm>
#include <cctype>
#include <random>
#include <string>

std::string generate_random_string() {
    static constexpr int kLength = 25;
    static const std::string lower = "abcdefghijklmnopqrstuvwxyz";
    static const std::string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static const std::string chars = lower + upper;
    static std::random_device rd;
    static std::mt19937 gen(rd());

    std::uniform_int_distribution<std::size_t> lower_dist(0, lower.size() - 1);
    std::uniform_int_distribution<std::size_t> upper_dist(0, upper.size() - 1);
    std::uniform_int_distribution<std::size_t> char_dist(0, chars.size() - 1);

    std::string result;
    result.reserve(kLength);
    result.push_back(lower[lower_dist(gen)]);
    result.push_back(upper[upper_dist(gen)]);
    for (int i = 2; i < kLength; ++i) {
        result.push_back(chars[char_dist(gen)]);
    }

    std::shuffle(result.begin(), result.end(), gen);
    return result;
}
