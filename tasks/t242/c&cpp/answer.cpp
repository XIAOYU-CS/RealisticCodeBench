#include <stdexcept>
#include <string>

std::string mask_bank_account_number(const std::string& account) {
    if (account.length() != 17) {
        throw std::invalid_argument("Account number must be exactly 17 characters long.");
    }

    for (char digit : account) {
        if (digit < '0' || digit > '9') {
            throw std::invalid_argument("Account number must contain only digits.");
        }
    }

    return "****" + account.substr(13);
}
