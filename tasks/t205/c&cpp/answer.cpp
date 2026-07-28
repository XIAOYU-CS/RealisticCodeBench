#include <iomanip>
#include <map>
#include <cmath>
#include <sstream>

std::string format_number_as_currency(double value, const std::string& currencyCode, const std::string& locale = "en-US") {
    (void)locale;

    static const std::map<std::string, std::string> symbols = {
        {"USD", "$"},
        {"EUR", "€"},
        {"GBP", "£"},
        {"JPY", "¥"},
    };

    std::string code = currencyCode;
    for (char& c : code) {
        c = static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
    }

    int decimals = code == "JPY" ? 0 : 2;
    double scale = std::pow(10.0, decimals);
    long long cents = static_cast<long long>(std::floor(std::fabs(value) * scale + 0.5));
    long long whole = cents / static_cast<long long>(scale);
    long long fraction = cents % static_cast<long long>(scale);

    std::string digits = std::to_string(whole);
    for (int i = static_cast<int>(digits.size()) - 3; i > 0; i -= 3) {
        digits.insert(static_cast<size_t>(i), ",");
    }

    std::ostringstream oss;
    if (value < 0) {
        oss << "-";
    }
    auto it = symbols.find(code);
    oss << (it == symbols.end() ? code : it->second) << digits;
    if (decimals > 0) {
        oss << "." << std::setw(decimals) << std::setfill('0') << fraction;
    }
    return oss.str();
}
