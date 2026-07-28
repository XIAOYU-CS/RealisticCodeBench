package org.real.temp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {

    /**
     * Formats a date according to the specified template.
     *
     * @param date     The date to format. Defaults to current date if null.
     * @param template The format template.
     *                 Supported placeholders:
     *                 - YYYY: 4-digit year
     *                 - MM: Month (01-12)
     *                 - DD: Day of month (01-31)
     *                 - HH: Hours in 24-hour format (00-23)
     *                 - hh: Hours in 12-hour format (01-12)
     *                 - mm: Minutes (00-59)
     *                 - ss: Seconds (00-59)
     *                 - A: AM/PM indicator
     *                 Defaults to "MM/DD/YYYY hh:mm:ss A".
     * @return The formatted date string.
     * @throws IllegalArgumentException If the date is invalid or template is not a string.
     */
    public static String formatDate(LocalDateTime date, String template) {
        if (template == null) {
            throw new IllegalArgumentException("Template must be a string");
        }

        if (date == null) {
            date = LocalDateTime.now();
        }

        // Build replacement map
        Map<String, String> replacements = new HashMap<>();
        replacements.put("YYYY", String.valueOf(date.getYear()));
        replacements.put("MM", String.format("%02d", date.getMonthValue()));
        replacements.put("DD", String.format("%02d", date.getDayOfMonth()));
        replacements.put("HH", String.format("%02d", date.getHour()));
        replacements.put("hh", String.format("%02d", date.getHour() % 12 == 0 ? 12 : date.getHour() % 12));
        replacements.put("mm", String.format("%02d", date.getMinute()));
        replacements.put("ss", String.format("%02d", date.getSecond()));
        replacements.put("A", date.getHour() < 12 ? "AM" : "PM");

        // Replace placeholders in template
        String result = template;
        Pattern pattern = Pattern.compile("YYYY|MM|DD|HH|hh|mm|ss|A");
        Matcher matcher = pattern.matcher(result);

        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String match = matcher.group();
            matcher.appendReplacement(sb, replacements.get(match));
        }
        matcher.appendTail(sb);

        return sb.toString();
    }

    /**
     * Formats the current date according to the specified template.
     *
     * @param template The format template.
     * @return The formatted date string.
     * @throws IllegalArgumentException If the template is not a string.
     */
    public static String formatDate(String template) {
        return formatDate(null, template);
    }

    /**
     * Formats the current date using the default template "MM/DD/YYYY hh:mm:ss A".
     *
     * @return The formatted date string.
     */
    public static String formatDate() {
        return formatDate(null, "MM/DD/YYYY hh:mm:ss A");
    }
}