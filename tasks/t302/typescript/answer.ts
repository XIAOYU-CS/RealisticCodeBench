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
): string {
    let newPath = path.replace(new RegExp(sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceChar);
    if (stripChars) {
        const stripCharsRegex = new RegExp(`^[${stripChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+|[${stripChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+$`, 'g');
        newPath = newPath.replace(stripCharsRegex, '');
    }
    if (removeItems !== null) {
        for (const item of removeItems) {
            const pattern = `${item}${replaceChar}`;
            newPath = newPath.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "");
        }
    }
    if (extraSuffixes !== null) {
        for (const suffix of extraSuffixes) {
            newPath = newPath.replace(new RegExp(suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "");
        }
    }
    return newPath;
}