#include <iostream>
#include <stdexcept>
#include <iomanip>
#include <cmath>

double calculate_discount_percentage(double originalPrice, double actualPrice) {
    // Validate input
    if (originalPrice <= 0) {
        throw std::invalid_argument("Original price must be greater than zero.");
    }
    if (actualPrice < 0) {
        throw std::invalid_argument("Actual price cannot be negative.");
    }

    // Calculate the discount
    double discountAmount = originalPrice - actualPrice;
    double discountPercentage = (discountAmount / originalPrice) * 100;

    // Return the discount percentage, rounded to two decimal places
    return std::round(discountPercentage * 100.0) / 100.0;
}
