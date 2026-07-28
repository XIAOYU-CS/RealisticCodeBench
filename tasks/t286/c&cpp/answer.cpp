#include <cmath>

/**
 * @brief Calculates the spatial weight based on the difference in spatial coordinates and a space standard deviation.
 *
 * The spatial weight is calculated using the formula:
 * weight = exp(- (spatial_diff^2) / (2 * sigma_space^2))
 *
 * @param spatial_diff The difference in spatial coordinates, which is used to compute the weight.
 * @param sigma_space The standard deviation for spatial distance, affecting the spread of the weight.
 * @return The spatial weight as a float.
 *
 */
float spatial_weight(float spatial_diff, float sigma_space) {
    return std::exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
}
