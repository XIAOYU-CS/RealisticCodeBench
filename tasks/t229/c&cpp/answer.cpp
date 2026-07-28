#include <cmath>
#include <cctype>
#include <stdexcept>
#include <string>

namespace {
double parse_number(const std::string& value) {
    size_t pos = 0;
    double parsed = std::stod(value, &pos);
    while (pos < value.size() && std::isspace(static_cast<unsigned char>(value[pos]))) {
        ++pos;
    }
    if (pos != value.size() || !std::isfinite(parsed)) {
        throw std::invalid_argument("Invalid price or discount value.");
    }
    return parsed;
}
}

double calculate_price_with_discount(const std::string& price, const std::string& discount) {
    double priceValue = parse_number(price);
    double discountValue = parse_number(discount);

    if (priceValue < 0) {
        throw std::invalid_argument("Price must be non-negative.");
    }
    if (discountValue < 0 || discountValue > 100) {
        throw std::invalid_argument("Discount percentage must be between 0 and 100.");
    }

    double discountAmount = priceValue * discountValue / 100;
    double finalPrice = priceValue - discountAmount;

    return std::round(finalPrice * 100) / 100;
}
