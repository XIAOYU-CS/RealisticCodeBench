/**
 * Modifies a specific line in the given file.
 * 
 * @param filePath - The path of the file to be modified.
 * @param lineNumber - The line number to be modified (1-based index).
 * @param newValue - The new value to update the line with.
 * @throws {Error} If `lineNumber` is invalid (≤ 0 or greater than the number of lines in the file).
 */
function modifyLineInFile(filePath: string, lineNumber: number, newValue: string): void {}