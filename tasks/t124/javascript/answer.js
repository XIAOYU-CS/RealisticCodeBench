/**
 * Extract a valid date from a filename, supporting multiple common formats and validating their correctness.
 *
 * Supported formats and validation rules:
 * - YYYY-MM-DD (e.g., 2023-12-31): Validates year, month, and day ranges.
 * - YYYYMMDD (e.g., 20231231): Validates year, month, and day ranges.
 * - DD-MM-YYYY (e.g., 31-12-2023): Month must be 1-12; day must conform to the month's number of days.
 * - MM-DD-YYYY (e.g., 12-31-2023): Same as above.
 * - DD/MM/YYYY (e.g., 31/12/2023): Same as above.
 * - MM/DD/YYYY (e.g., 12/31/2023): Same as above.
 *
 * @param {string} fileName - The input filename string.
 * @returns {string|null} A valid date string extracted from the filename, or null if no valid date is found.
 */
function extractDateFromFilename(fileName) {
    // Define date formats with corresponding regex patterns and parsing formats
    const dateFormats = [
        [/\d{4}-\d{2}-\d{2}/g, 'YYYY-MM-DD'],          // YYYY-MM-DD
        [/\d{8}/g, 'YYYYMMDD'],                        // YYYYMMDD
        [/\d{2}-\d{2}-\d{4}/g, ['DD-MM-YYYY', 'MM-DD-YYYY']],  // DD-MM-YYYY / MM-DD-YYYY
        [/\d{2}\/\d{2}\/\d{4}/g, ['DD/MM/YYYY', 'MM/DD/YYYY']]   // DD/MM/YYYY / MM/DD/YYYY
    ];

    // Helper function to validate date
    function isValidDate(dateStr, format) {
        try {
            let day, month, year;
            
            switch (format) {
                case 'YYYY-MM-DD':
                    [, year, month, day] = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                    break;
                case 'YYYYMMDD':
                    year = dateStr.substring(0, 4);
                    month = dateStr.substring(4, 6);
                    day = dateStr.substring(6, 8);
                    break;
                case 'DD-MM-YYYY':
                    [, day, month, year] = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
                    break;
                case 'MM-DD-YYYY':
                    [, month, day, year] = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
                    break;
                case 'DD/MM/YYYY':
                    [, day, month, year] = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                    break;
                case 'MM/DD/YYYY':
                    [, month, day, year] = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                    break;
                default:
                    return false;
            }
            
            // Convert to numbers
            day = parseInt(day, 10);
            month = parseInt(month, 10);
            year = parseInt(year, 10);
            
            // Basic range checks
            if (year < 1000 || year > 9999) return false;
            if (month < 1 || month > 12) return false;
            if (day < 1 || day > 31) return false;
            
            // Create Date object to validate (months are 0-indexed in JS)
            const date = new Date(year, month - 1, day);
            
            // Check if the date is valid and matches the input
            return date.getFullYear() === year && 
                   date.getMonth() === month - 1 && 
                   date.getDate() === day;
                   
        } catch (error) {
            return false;
        }
    }

    // Iterate through each date format
    for (const [pattern, formats] of dateFormats) {
        // Reset regex lastIndex to handle global flag properly
        pattern.lastIndex = 0;
        const matches = fileName.match(pattern) || [];
        
        for (const dateStr of matches) {
            // Try each parser for ambiguous formats
            if (Array.isArray(formats)) {
                for (const format of formats) {
                    if (isValidDate(dateStr, format)) {
                        return dateStr; // Valid date found
                    }
                }
            } else {
                if (isValidDate(dateStr, formats)) {
                    return dateStr;
                }
            }
        }
    }

    // No valid date found
    return null;
}
