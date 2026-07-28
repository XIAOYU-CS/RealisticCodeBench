package org.real.temp;

import java.text.NumberFormat;
import java.util.Locale;

public class Answer {
    /**
     * Formats a number as currency according to the specified locale and currency code.
     *
     * @param value - The numerical value to be formatted.
     * @param currencyCode - The currency code (e.g., "USD", "EUR").
     * @param locale - The locale string (e.g., "en-US", "fr-FR"). Default is "en-US".
     * @return The formatted currency string.
     */
    public static String formatNumberAsCurrency(double value, String currencyCode, String localeStr) {
        Locale locale = localeStr != null ? Locale.forLanguageTag(localeStr) : Locale.US;
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
        formatter.setCurrency(java.util.Currency.getInstance(currencyCode));
        return formatter.format(value);
    }
}