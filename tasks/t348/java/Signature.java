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
public static String formatDate(LocalDateTime date, String template) {}