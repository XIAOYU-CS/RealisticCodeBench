#include <algorithm>

static long double combination(int n, int k) {
    if (k < 0 || k > n) {
        return 0.0L;
    }

    k = std::min(k, n - k);
    long double result = 1.0L;
    for (int i = 1; i <= k; ++i) {
        result = result * (n - k + i) / i;
    }
    return result;
}

double probability_of_red_balls(int n, int x, int y) {
    constexpr int draws = 15;
    const int total = x + y;
    if (n < 0 || n > draws || x < 0 || y < 0 || n > x || draws - n > y || total < draws) {
        return 0.0;
    }

    const long double total_combinations = combination(total, draws);
    if (total_combinations == 0.0L) {
        return 0.0;
    }
    return static_cast<double>(combination(x, n) * combination(y, draws - n) / total_combinations);
}
