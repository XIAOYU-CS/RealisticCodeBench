/**
 * Finds all picture files in specified directory with customizable extensions.
 *
 * @param directory - Root directory to search. Defaults to '/media/'.
 * @param allowedExtensions - List of allowed file extensions (e.g., ['.jpg', '.png']).
 *                            Defaults to ['.jpg'] if not specified.
 * @returns Promise resolving to array of absolute paths of found picture files
 * @throws {Error} Throws NotADirectoryError if directory doesn't exist or isn't a directory
 * @throws {Error} Throws PermissionError if no read permission for directory
 */
async function getFotoFiles(
    directory: string = '/media/',
    allowedExtensions?: string[]
): Promise<string[]> {}