package org.real.temp;
public class Answer {
    public static String shortenLargeNumber(double num) {
        if (num >= 1_000_000) {
            return String.format("%.1fM", num / 1_000_000);
        } else if (num >= 1_000) {
            return String.format("%.1fK", num / 1_000);
        } else {
            String value = String.valueOf(num);
            return value.endsWith(".0") ? value.substring(0, value.length() - 2) : value;
        }
    }
}
