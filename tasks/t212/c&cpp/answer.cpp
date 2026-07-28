#include <string>
#include <vector>

std::string compress_hash_to_alphanumeric(const std::string& hash) {
    const std::string alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    std::string result;
    std::vector<unsigned char> digits(1, 0);

    for (unsigned char byte : hash) {
        int carry = byte;
        for (unsigned char& digit : digits) {
            int value = digit * 256 + carry;
            digit = value % 62;
            carry = value / 62;
        }
        while (carry > 0) {
            digits.push_back(carry % 62);
            carry /= 62;
        }
    }

    while (result.length() < 5) {
        unsigned char digit = result.length() < digits.size() ? digits[result.length()] : 0;
        result += alphabet[digit];
    }

    return result;
}
