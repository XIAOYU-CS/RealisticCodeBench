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
 * @param fileName - The input filename string.
 * @returns A valid date string extracted from the filename, or null if no valid date is found.
 */
function extractDateFromFilename(fileName: string): string | null {
    // Define date formats with corresponding regex patterns and parsing formats
    const dateFormats: [RegExp, string | string[]][] = [
        [/\d{4}-\d{2}-\d{2}/g, 'YYYY-MM-DD'],          // YYYY-MM-DD
        [/\d{8}/g, 'YYYYMMDD'],                        // YYYYMMDD
        [/\d{2}-\d{2}-\d{4}/g, ['DD-MM-YYYY', 'MM-DD-YYYY']],  // DD-MM-YYYY / MM-DD-YYYY
        [/\d{2}\/\d{2}\/\d{4}/g, ['DD/MM/YYYY', 'MM/DD/YYYY']]   // DD/MM/YYYY / MM/DD/YYYY
    ];

    // Helper function to validate date
    function isValidDate(dateStr: string, format: string): boolean {
        try {
            let day: string, month: string, year: string;

            switch (format) {
                case 'YYYY-MM-DD':
                    const match1 = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
                    if (!match1) return false;
                    [, year, month, day] = match1;
                    break;
                case 'YYYYMMDD':
                    if (dateStr.length !== 8) return false;
                    year = dateStr.substring(0, 4);
                    month = dateStr.substring(4, 6);
                    day = dateStr.substring(6, 8);
                    break;
                case 'DD-MM-YYYY':
                    const match2 = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
                    if (!match2) return false;
                    [, day, month, year] = match2;
                    break;
                case 'MM-DD-YYYY':
                    const match3 = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
                    if (!match3) return false;
                    [, month, day, year] = match3;
                    break;
                case 'DD/MM/YYYY':
                    const match4 = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                    if (!match4) return false;
                    [, day, month, year] = match4;
                    break;
                case 'MM/DD/YYYY':
                    const match5 = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                    if (!match5) return false;
                    [, month, day, year] = match5;
                    break;
                default:
                    return false;
            }

            // Convert to numbers
            const dayNum = parseInt(day, 10);
            const monthNum = parseInt(month, 10);
            const yearNum = parseInt(year, 10);

            // Basic range checks
            if (yearNum < 1000 || yearNum > 9999) return false;
            if (monthNum < 1 || monthNum > 12) return false;
            if (dayNum < 1 || dayNum > 31) return false;

            // Create Date object to validate (months are 0-indexed in JS)
            const date = new Date(yearNum, monthNum - 1, dayNum);

            // Check if the date is valid and matches the input
            return date.getFullYear() === yearNum &&
                   date.getMonth() === monthNum - 1 &&
                   date.getDate() === dayNum;

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