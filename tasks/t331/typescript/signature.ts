/**
 * Supported time units for conversion
 */
type TimeUnit = 'h' | 'm' | 's' | 'ms';

/**
 * Convert time string with hours(h), minutes(m), seconds(s) to specified unit value.
 *
 * @param timeStr - Time string in format like "1.5h30m2.5s", "45.5m", "10s", etc.
 * @param unit - Output unit. Supported values are: 'h', 'm', 's', 'ms'. Defaults to 'ms'.
 * @returns Converted time value as number, or integer when unit is 'ms' (rounded to integer).
 * @throws Error if time string format is invalid or unit is not supported.
 */
function convertTimeHmsToUnit(timeStr: string, unit: TimeUnit = 'ms'): number {}