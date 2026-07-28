/**
 * Convert time string with hours(h), minutes(m), seconds(s) to specified unit value.
 *
 * @param {string} timeStr - Time string in format like "1.5h30m2.5s", "45.5m", "10s", etc.
 * @param {string} unit - Output unit. Supported values are: 'h', 'm', 's', 'ms'. Defaults to 'ms'.
 * @returns {number} Converted time value as float, or int when unit is 'ms' (rounded to integer).
 * @throws {Error} If time string format is invalid or unit is not supported.
 */
function convertTimeHmsToUnit(timeStr, unit = 'ms') {
    // Regular expression supports integer/decimal h, m, s combinations
    const pattern = /^(?:(\d+\.?\d*)h)?(?:(\d+\.?\d*)m)?(?:(\d+\.?\d*)s)?$/;
    const match = timeStr.trim().match(pattern);

    if (!match) {
        throw new Error(`Invalid time format: ${timeStr}, please use format like '1.5h30m2.5s'`);
    }

    // Parse time components (default to 0.0 if missing)
    const hours = match[1] ? parseFloat(match[1]) : 0.0;
    const minutes = match[2] ? parseFloat(match[2]) : 0.0;
    const seconds = match[3] ? parseFloat(match[3]) : 0.0;

    // Calculate total seconds (unified intermediate unit is seconds for easy conversion)
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Convert according to target unit (supported units and conversion factors)
    const unitConverters = {
        'h': (s) => s / 3600,  // hours = seconds / 3600
        'm': (s) => s / 60,    // minutes = seconds / 60
        's': (s) => s,         // seconds = seconds
        'ms': (s) => Math.round(s * 1000)  // milliseconds = seconds * 1000 (rounded to integer)
    };

    if (!unitConverters.hasOwnProperty(unit)) {
        throw new Error(`Unsupported unit: ${unit}, supported units are 'h', 'm', 's', 'ms'`);
    }

    return unitConverters[unit](totalSeconds);
}