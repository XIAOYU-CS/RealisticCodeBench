#include <string>

/**
 * @brief Masks a 17-digit bank account number, revealing only the last 4 digits.
 *
 * Example:
 * mask_bank_account_number("12345678901234567") -> "****4567"
 *
 * @param[in] account The bank account number as a 17-digit numeric string.
 * @return "****" followed by the last 4 digits.
 *
 * @throws std::invalid_argument if the input is not exactly 17 digits.
 */
std::string mask_bank_account_number(const std::string& account);
