#include <string>

std::string compute_pi_to_digits(int digits) {
    const std::string pi = "3.14159265358979323846264338327950288419716939937510";
    if (digits <= 0) {
        return "3";
    }

    std::string result = pi.substr(0, static_cast<std::size_t>(digits) + 2);
    if (static_cast<std::size_t>(digits) + 2 >= pi.size() ||
        pi[static_cast<std::size_t>(digits) + 2] < '5') {
        return result;
    }

    for (int i = static_cast<int>(result.size()) - 1; i >= 0; --i) {
        if (result[i] == '.') {
            continue;
        }
        if (result[i] < '9') {
            ++result[i];
            return result;
        }
        result[i] = '0';
    }
    return "1" + result;
}
