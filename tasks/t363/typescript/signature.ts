/**
 * Asynchronously calculate the total size (in bytes) of all files in the specified directory
 *
 * @param directory - The directory path to calculate size for
 * @returns The total size (in bytes) of all files in the directory
 * @throws {Error} When directory does not exist, no permission to access, or path is not a directory
 */
async function calculateDirectorySize(directory: string): Promise<number> {}