#include <cmath>
#include <vector>

const double k_B_over_keV = 8.617333262145e-5;

double convert_keV_to_log10_Kelvin(double T_keV) {
    return std::log10(T_keV / k_B_over_keV);
}

std::vector<double> convert_keV_to_log10_Kelvin(const std::vector<double>& T_keV) {
    std::vector<double> result;
    result.reserve(T_keV.size());
    for (double t : T_keV) {
        result.push_back(convert_keV_to_log10_Kelvin(t));
    }
    return result;
}
