/**
 * @brief Scales all values in an array from an input range to a specified output range
 *
 * @param inputArray Vector of values to be scaled
 * @param inputMin Minimum bound of the input value range
 * @param inputMax Maximum bound of the input value range
 * @param outputMin Minimum bound of the desired output range
 * @param outputMax Maximum bound of the desired output range
 * @return std::vector<double> New vector containing values scaled to the output range
 * @throws std::invalid_argument If any element in inputArray is outside [inputMin, inputMax]
 */
std::vector<double> scale_array_to_range(const std::vector<double>& inputArray, double inputMin, double inputMax, double outputMin, double outputMax) {}