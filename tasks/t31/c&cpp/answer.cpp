// Function to calculate the probability that x balls randomly drawn from a jar
// containing n red balls and m blue balls will all be red balls.
double probability_red_balls(int x, int n, int m) {
    long long total_balls = static_cast<long long>(n) + m;
    if (x < 0 || n < 0 || m < 0 || x > n || x > total_balls) {
        return 0.0;
    }

    double probability = 1.0;
    for (int i = 0; i < x; ++i) {
        probability *= static_cast<double>(n - i) / (n + m - i);
    }
    return probability;
}
