#include <cmath>
#include <stdexcept>
#include <tuple>
#include <type_traits>

const double k_B_over_keV = 8.617333262145e-5;

template <typename T, typename = void>
struct is_tuple : std::false_type {};

template <typename T>
struct is_tuple<T, std::void_t<decltype(std::tuple_size<std::decay_t<T>>::value)>> : std::true_type {};

template <typename T>
auto convert_log10_K_to_keV(T T_log10_K) {
    if constexpr (std::is_arithmetic_v<T>) {
        return std::pow(10.0, static_cast<double>(T_log10_K)) * k_B_over_keV;
    } else if constexpr (is_tuple<T>::value) {
        return std::apply([](auto... values) {
            return std::make_tuple(convert_log10_K_to_keV(values)...);
        }, T_log10_K);
    } else {
        throw std::invalid_argument("Input must be a scalar or a tuple.");
    }
}
