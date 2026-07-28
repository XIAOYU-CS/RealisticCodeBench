/**
 * Finds all picture files in specified directory with customizable extensions.
 *
 * @param {string} directory - Root directory to search. Defaults to '/media/'.
 * @param {string[]} [allowedExtensions] - List of allowed file extensions (e.g., ['.jpg', '.png']).
 *                                         Defaults to ['.jpg'] if not specified.
 * @returns {Promise<string[]>} Promise resolving to array of absolute paths of found picture files
 * @throws {Error} Throws error if directory is invalid or inaccessible
 */
async function getFotoFiles(directory = '/media/', allowedExtensions) {}