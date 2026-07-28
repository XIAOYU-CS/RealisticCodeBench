#include "signature.cpp"

#include <cmath>
#include <cstdint>

double hash_recipe_id_to_price(const std::string& recipeId, double minVal, double maxVal) {
    int32_t hash = 0;
    for (unsigned char ch : recipeId) {
        hash = static_cast<int32_t>((static_cast<uint32_t>(hash) << 5) - static_cast<uint32_t>(hash) + ch);
    }

    double rangeCents = (maxVal - minVal) * 100.0;
    double mappedValue = std::fmod(std::abs(static_cast<double>(hash)), rangeCents) / 100.0 + minVal;
    return std::round(mappedValue * 100.0) / 100.0;
}
