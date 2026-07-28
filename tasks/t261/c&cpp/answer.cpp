#include <vector>

double calculate_average_difference(const std::vector<int>& numbers) {
    if (numbers.size() < 2) {
        return 0.0;
    }

    long long total = 0;
    for (std::size_t i = 1; i < numbers.size(); ++i) {
        total += numbers[i] - numbers[i - 1];
    }
    return static_cast<double>(total) / static_cast<double>(numbers.size() - 1);
}
