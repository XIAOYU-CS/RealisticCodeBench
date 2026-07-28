#include <vector>

std::vector<int> generatePrimes(int count) {
    std::vector<int> primes;

    for (int candidate = 2; static_cast<int>(primes.size()) < count; ++candidate) {
        bool prime = true;
        for (int factor = 2; factor * factor <= candidate; ++factor) {
            if (candidate % factor == 0) {
                prime = false;
                break;
            }
        }
        if (prime) {
            primes.push_back(candidate);
        }
    }

    return primes;
}

std::vector<int> findOrder(int n) {
    if (n <= 0) {
        return {};
    }

    std::vector<int> people;
    people.reserve(n);
    for (int i = 1; i <= n; ++i) {
        people.push_back(i);
    }

    std::vector<int> order;
    order.reserve(n);
    int index = 0;

    for (int step : generatePrimes(n - 1)) {
        index = (index + step - 1) % static_cast<int>(people.size());
        order.push_back(people[index]);
        people.erase(people.begin() + index);
    }

    order.insert(order.end(), people.begin(), people.end());
    return order;
}
