package org.real.temp;

public class Answer {
    private static final int[] DAYS_IN_MONTH = {
        0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    };

    public static int getDaysInMonth(int year, int month) {
        if (month < 1 || month > 12) {
            throw new IllegalArgumentException("Month must be between 1 and 12");
        }

        if (month == 2 && ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))) {
            return 29;
        }

        return DAYS_IN_MONTH[month];
    }
}
