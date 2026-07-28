/**
 * Converts Arabic numerals (٠-٩) in a string to their corresponding English numerals (0-9).
 * Non-numeral characters and English numerals remain unchanged.
 *
 * @param {string} str - The input string containing Arabic numerals to be converted
 * @returns {string} The converted string with Arabic numerals replaced by English numerals
 */
function convertArabicToEnglishNumbers(str: string): string {
    const arabicNums: { [key: string]: string } = {
        "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
        "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9"
    };

    return str
        .split("")
        .map((char: string) => arabicNums[char] || char)
        .join("");
}