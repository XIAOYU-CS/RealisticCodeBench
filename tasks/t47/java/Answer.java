package org.real.temp;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class Answer {

    private static final String DEFAULT_FORMAT = "%a %b %d %I:%M:%S %p %z %Y";
    private static final Map<String, String> STRFTIME_TOKENS = new HashMap<>();

    static {
        STRFTIME_TOKENS.put("%a", "EEE");
        STRFTIME_TOKENS.put("%A", "EEEE");
        STRFTIME_TOKENS.put("%b", "MMM");
        STRFTIME_TOKENS.put("%B", "MMMM");
        STRFTIME_TOKENS.put("%d", "dd");
        STRFTIME_TOKENS.put("%m", "MM");
        STRFTIME_TOKENS.put("%y", "yy");
        STRFTIME_TOKENS.put("%Y", "yyyy");
        STRFTIME_TOKENS.put("%H", "HH");
        STRFTIME_TOKENS.put("%I", "hh");
        STRFTIME_TOKENS.put("%M", "mm");
        STRFTIME_TOKENS.put("%S", "ss");
        STRFTIME_TOKENS.put("%p", "a");
        STRFTIME_TOKENS.put("%z", "XX");
        STRFTIME_TOKENS.put("%Z", "z");
        STRFTIME_TOKENS.put("%%", "'%'");
    }

    /**
     * Convert a UNIX timestamp to a formatted datetime string using the system's local timezone.
     *
     * @param mtime UNIX timestamp.
     * @param format Format string for `DateTimeFormatter`.
     * @return Formatted datetime string.
     */
    public static String unixTimestampToFormattedLocalDatetime(long mtime, String format) {
        if (mtime < 0) {
            throw new IllegalArgumentException("mtime cannot be negative");
        }

        ZoneId localTz;
        try {
            // Get the local system timezone
            localTz = ZoneId.systemDefault();
        } catch (Exception e) {
            // Fallback to UTC if the local timezone is not found
            localTz = ZoneId.of("UTC");
        }

        String formatterPattern = toDateTimeFormatterPattern(format == null ? DEFAULT_FORMAT : format);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatterPattern, Locale.US);

        try {
            // Convert the UNIX timestamp to a ZonedDateTime object with timezone
            ZonedDateTime dateTime = ZonedDateTime.ofInstant(java.time.Instant.ofEpochSecond(mtime), localTz);
            // Return the formatted datetime string
            return dateTime.format(formatter);
        } catch (DateTimeParseException e) {
            // Handle any other unexpected errors
            throw new IllegalArgumentException("Error formatting the datetime: " + e.getMessage());
        }
    }

    private static String toDateTimeFormatterPattern(String format) {
        StringBuilder pattern = new StringBuilder();
        for (int i = 0; i < format.length(); i++) {
            char ch = format.charAt(i);
            if (ch == '%' && i + 1 < format.length()) {
                String token = format.substring(i, i + 2);
                String replacement = STRFTIME_TOKENS.get(token);
                if (replacement != null) {
                    pattern.append(replacement);
                    i++;
                    continue;
                }
            }
            if ("'[]{}#".indexOf(ch) >= 0) {
                pattern.append('\'').append(ch).append('\'');
            } else {
                pattern.append(ch);
            }
        }
        return pattern.toString();
    }
}
