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
