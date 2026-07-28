/**
 * Convert time string with hours(h), minutes(m), seconds(s) to specified unit value.
 *
 * @param {string} timeStr - Time string in format like "1.5h30m2.5s", "45.5m", "10s", etc.
 * @param {string} unit - Output unit. Supported values are: 'h', 'm', 's', 'ms'. Defaults to 'ms'.
 * @returns {number} Converted time value as float, or int when unit is 'ms' (rounded to integer).
 * @throws {Error} If time string format is invalid or unit is not supported.
 */
function convertTimeHmsToUnit(timeStr, unit = 'ms') {}