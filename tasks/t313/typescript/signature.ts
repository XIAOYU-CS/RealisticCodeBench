/**
 * Processes path strings to generate simplified names, supporting custom rules while preserving default behavior
 *
 * @param path - Input path string
 * @param sep - Separator in the path
 * @param replaceChar - Character to replace separators with
 * @param stripChars - Characters to strip from the start and end
 * @param removeItems - List of keywords to remove (only processed if provided)
 * @param extraSuffixes - Additional suffixes to remove (only processed if provided)
 * @returns Processed simplified name
 */
function customFormatFilePath(
    path: string,
    sep: string = "/",
    replaceChar: string = "_",
    stripChars: string = "_",
    removeItems: string[] | null = null,
    extraSuffixes: string[] | null = null
): string {}