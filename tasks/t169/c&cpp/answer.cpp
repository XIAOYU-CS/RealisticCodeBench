#include <vector>
#include <cstdlib>
#include <ctime>
#include <utility>

std::vector<int>& randomize_array_order(std::vector<int>& array) {
    std::srand(static_cast<unsigned int>(std::time(nullptr))); // Seed for randomness
    int currentIndex = array.size();

    while (currentIndex > 0) {
        int randomIndex = std::rand() % currentIndex;
        currentIndex--;

        // Swap the elements at currentIndex and randomIndex
        std::swap(array[currentIndex], array[randomIndex]);
    }

    return array;
}
