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
public static Number convertTimeHmsToUnit(String timeStr, String unit) {}