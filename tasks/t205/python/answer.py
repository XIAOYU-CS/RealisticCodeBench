from decimal import Decimal, ROUND_HALF_UP

_CURRENCY_SYMBOLS = {
    "USD": "$",
    "EUR": "€",
    "GBP": "£",
    "JPY": "¥",
}
_ZERO_DECIMAL_CURRENCIES = {"JPY"}


def format_number_as_currency(value: float, currency_code: str, locale: str = "en-US") -> str:
    """
    Formats a number as currency according to the specified locale and currency code.

    Args:
        value (float): The numerical value to be formatted.
        currency_code (str): The currency code (e.g., "USD", "EUR").
        locale (str): The locale string (e.g., "en-US", "fr-FR"). Default is "en-US".

    Returns:
        str: The formatted currency string.
    """
    currency_code = currency_code.upper()
    decimals = 0 if currency_code in _ZERO_DECIMAL_CURRENCIES else 2
    amount = Decimal(str(abs(value))).quantize(
        Decimal("1") if decimals == 0 else Decimal("0.01"),
        ROUND_HALF_UP,
    )
    sign = "-" if value < 0 else ""
    return f"{sign}{_CURRENCY_SYMBOLS.get(currency_code, currency_code)}{amount:,.{decimals}f}"
