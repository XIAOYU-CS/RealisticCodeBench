
#include <vector>
#include <algorithm>
#include <random>
#include <stdexcept>
#include <unordered_set>

template <typename T>
std::vector<std::vector<T>> generate_random_subsets(
        int start,
        int stop,
        int size,
        int count,
        int step = 1,
        bool allow_duplicates = true,
        bool shuffle = false,
        const std::vector<T>* data_source = nullptr) {

    std::vector<T> population;
    if (data_source != nullptr) {
        population = *data_source;
        if (population.size() < static_cast<size_t>(size)) {
            throw std::invalid_argument("Length of data source is smaller than subset size");
        }
    } else {
        for (int i = start; i < stop; i += step) {
            population.push_back(i);
        }
        if (population.size() < static_cast<size_t>(size)) {
            throw std::invalid_argument("Specified range cannot produce a subset of the required size");
        }
    }

    std::vector<std::vector<T>> subsets;
    int max_attempts = count * 10;
    int attempts = 0;
    std::random_device rd;
    std::mt19937 gen(rd());

    while (subsets.size() < static_cast<size_t>(count) && attempts < max_attempts) {
        attempts++;

        std::vector<T> subset;
        if (data_source == nullptr && step == 1) {
            std::uniform_int_distribution<> dis(0, population.size() - size);
            int start_idx = dis(gen);
            subset = std::vector<T>(population.begin() + start_idx, population.begin() + start_idx + size);
        } else {
            std::sample(population.begin(), population.end(), std::back_inserter(subset), size, gen);
        }

        if (!shuffle && data_source == nullptr) {
            std::sort(subset.begin(), subset.end());
        }

        if (!allow_duplicates) {
            bool duplicate_found = false;
            std::unordered_set<T> subset_set(subset.begin(), subset.end());
            for (const auto& existing : subsets) {
                std::unordered_set<T> existing_set(existing.begin(), existing.end());
                if (subset_set == existing_set) {
                    duplicate_found = true;
                    break;
                }
            }
            if (duplicate_found) {
                continue;
            }
        }

        subsets.push_back(subset);
    }

    if (subsets.size() < static_cast<size_t>(count)) {
        throw std::runtime_error("Could not generate enough unique subsets");
    }

    return subsets;
}
