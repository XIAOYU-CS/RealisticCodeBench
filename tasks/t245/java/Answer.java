package org.real.temp;

/**
 * Abbreviates a number to a string with a suffix based on its magnitude.
 *
 * @param number - The number to abbreviate.
 * @return - The abbreviated string representation of the number.
 */
public class Answer {
    public static String abbreviateNumberWithSuffix(double number) {
        // If the number is less than 1000, return it as is.
        if (number < 1000) {
            return formatNumber(number);
        }

        // Determine the tier of the number based on its magnitude.
        int tier = (int) Math.floor(Math.log10(number) / 3);

        // Define suffixes for each tier.
        String[] suffixes = {"", "k", "M", "B", "T"};

        // Calculate the base number by dividing by the corresponding power of ten.
        double baseNumber = number / Math.pow(10, tier * 3);

        // Round the base number to one decimal place.
        double roundedNumber = Math.round(baseNumber * 10) / 10.0;

        // Return the number with its corresponding suffix.
        return formatNumber(roundedNumber) + suffixes[tier];
    }

    private static String formatNumber(double number) {
        if (number == Math.rint(number)) {
            return String.valueOf((long) number);
        }
        return String.valueOf(number);
    }
}
