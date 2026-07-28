/**
 * Format date string with support for multiple input formats and custom output format.
 * 
 * @param {string} dateStr - Input date string to be formatted
 * @param {string[]} [inputFormats=null] - List of possible input formats, defaults to predefined formats
 * @param {string} [outputFormat='%Y-%m-%d_%H:%M:%S'] - Output date string format
 * @returns {string|null} Formatted date string; returns null if parsing fails
 */
function formatDateString(dateStr, inputFormats = null, outputFormat = '%Y-%m-%d_%H:%M:%S') {
    // Default input formats
    const defaultFormats = ['%a, %d %b %Y %H:%M:%S %z (%Z)'];
    inputFormats = inputFormats || defaultFormats;

    // Try to parse with all possible input formats
    for (const fmt of inputFormats) {
        try {
            const dateObj = parseDate(dateStr, fmt);
            if (dateObj) {
                return formatDate(dateObj, outputFormat);
            }
        } catch (error) {
            continue; // Try next format
        }
    }

    // All format parsing failed
    console.log(`Unable to parse date string: ${dateStr}, attempted formats: ${inputFormats}`);
    return null;
}

/**
 * Parse date string according to format
 * @param {string} dateStr 
 * @param {string} format 
 * @returns {Date|null}
 */
function parseDate(dateStr, format) {
    try {
        // Handle the default format: '%a, %d %b %Y %H:%M:%S %z (%Z)'
        if (format === '%a, %d %b %Y %H:%M:%S %z (%Z)') {
            const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
            const match = dateStr.match(/^[A-Z][a-z]{2}, (\d{1,2}) ([A-Z][a-z]{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) [+-]\d{4} \([A-Z]+\)$/);
            if (!match || !(match[2] in months)) return null;
            const [, day, monthName, year, hours, minutes, seconds] = match;
            const date = new Date(Number(year), months[monthName], Number(day), Number(hours), Number(minutes), Number(seconds));
            return isNaN(date.getTime()) ? null : date;
        }
        
        // Add more format parsing logic as needed
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    } catch (error) {
        return null;
    }
}

/**
 * Format Date object according to format string
 * @param {Date} date 
 * @param {string} format 
 * @returns {string}
 */
function formatDate(date, format) {
    const pad = (num) => String(num).padStart(2, '0');
    const pad4 = (num) => String(num).padStart(4, '0');
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const replacements = {
        '%Y': pad4(date.getFullYear()),
        '%m': pad(date.getMonth() + 1),
        '%d': pad(date.getDate()),
        '%H': pad(date.getHours()),
        '%M': pad(date.getMinutes()),
        '%S': pad(date.getSeconds())
    };
    
    let result = format;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(key, 'g'), value);
    }
    
    return result;
}
