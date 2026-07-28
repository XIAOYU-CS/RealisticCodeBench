/**
 * Formats a date according to the specified template.
 *
 * @param {Date} [date=new Date()] - The date to format. Defaults to current date.
 * @param {string} [template="MM/DD/YYYY hh:mm:ss A"] - The format template.
 *   Supported placeholders:
 *   - YYYY: 4-digit year
 *   - MM: Month (01-12)
 *   - DD: Day of month (01-31)
 *   - HH: Hours in 24-hour format (00-23)
 *   - hh: Hours in 12-hour format (01-12)
 *   - mm: Minutes (00-59)
 *   - ss: Seconds (00-59)
 *   - A: AM/PM indicator
 * @returns {string} The formatted date string.
 */
function formatDate(date = new Date(), template = "MM/DD/YYYY hh:mm:ss A") {}