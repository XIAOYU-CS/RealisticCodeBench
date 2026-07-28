#include <string>
#include <algorithm>
#include <random>

std::string shuffle_string_characters(const std::string& inputString) {
    std::string result = inputString;
    static std::random_device rd;
    static std::mt19937 gen(rd());
    std::shuffle(result.begin(), result.end(), gen);
    return result;
}
