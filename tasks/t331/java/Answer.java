package org.real.temp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {

    /**
     * Converts a time string with hours(h), minutes(m), seconds(s) to a specified unit value.
     *
     * @param timeStr Time string in format like "1.5h30m2.5s", "45.5m", "10s", etc.
     * @param unit    Output unit. Supported values are:
     *                - "h": hours
     *                - "m": minutes
     *                - "s": seconds
     *                - "ms": milliseconds
     *                Defaults to "ms".
     * @return Converted time value as double or int when unit is "ms" (rounded to integer).
     * @throws IllegalArgumentException If time string format is invalid or unit is not supported.
     */
    public static Number convertTimeHmsToUnit(String timeStr, String unit) {
        if (timeStr == null || unit == null) {
            throw new IllegalArgumentException("Input parameters must not be null");
        }

        String patternStr = "^(?:(\\d+\\.?\\d*)h)?(?:(\\d+\\.?\\d*)m)?(?:(\\d+\\.?\\d*)s)?$";
        Pattern pattern = Pattern.compile(patternStr);
        Matcher matcher = pattern.matcher(timeStr.trim());

        if (!matcher.matches()) {
            throw new IllegalArgumentException("Invalid time format: " + timeStr + ", please use format like '1.5h30m2.5s'");
        }

        double hours = parseGroup(matcher.group(1));
        double minutes = parseGroup(matcher.group(2));
        double seconds = parseGroup(matcher.group(3));

        double totalSeconds = hours * 3600 + minutes * 60 + seconds;

        switch (unit) {
            case "h":
                return totalSeconds / 3600;
            case "m":
                return totalSeconds / 60;
            case "s":
                return totalSeconds;
            case "ms":
                return Math.round(totalSeconds * 1000);
            default:
                throw new IllegalArgumentException("Unsupported unit: " + unit + ", supported units are 'h', 'm', 's', 'ms'");
        }
    }

    private static double parseGroup(String group) {
        return group != null ? Double.parseDouble(group) : 0.0;
    }

    // Overloaded method using default unit "ms"
    public static Number convertTimeHmsToUnit(String timeStr) {
        return convertTimeHmsToUnit(timeStr, "ms");
    }
}
