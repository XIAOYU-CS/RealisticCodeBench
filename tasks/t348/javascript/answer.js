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
function formatDate(date = new Date(), template = "MM/DD/YYYY hh:mm:ss A") {
  // Validate input
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  if (typeof template !== 'string') {
    throw new Error('Template must be a string');
  }

  const map = {
    YYYY: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'), // 24-hour format
    hh: String(date.getHours() % 12 || 12).padStart(2, '0'), // 12-hour format
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
    A: date.getHours() < 12 ? 'AM' : 'PM'
  };

  return template.replace(/YYYY|MM|DD|HH|hh|mm|ss|A/g, match => map[match]);
};