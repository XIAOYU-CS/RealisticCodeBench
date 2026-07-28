import * as fsp from 'fs/promises';
import * as nodePath from 'path';

/**
 * Asynchronously calculate the total size (in bytes) of all files in the specified directory
 *
 * @param directory - The directory path to calculate size for
 * @returns The total size (in bytes) of all files in the directory
 * @throws {Error} When directory does not exist, no permission to access, or path is not a directory
 */
async function calculateDirectorySize(directory: string): Promise<number> {
    try {
        // Check if directory exists and get stats
        const stats = await fsp.stat(directory);

        // Check if it's actually a directory
        if (!stats.isDirectory()) {
            throw new Error(`${directory} is not a directory`);
        }
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            throw new Error(`Directory does not exist: ${directory}`);
        } else if (error.code === 'EACCES') {
            throw new Error(`No permission to access directory: ${directory}`);
        } else {
            throw error;
        }
    }

    let totalSize = 0;

    /**
     * Process a single directory entry (file or subdirectory)
     * @param entryPath - The path of the entry to process
     * @returns Subdirectory path if it's a directory, null otherwise
     */
    async function processEntry(entryPath: string): Promise<string | null> {
        try {
            const stats = await fsp.stat(entryPath);

            if (stats.isFile()) {
                // For files, add their size
                totalSize += stats.size;
                return null;
            } else if (stats.isDirectory()) {
                // For subdirectories, return path for later processing
                return entryPath;
            }
            return null;
        } catch (error: any) {
            if (error.code === 'EACCES') {
                console.log(`No permission to access: ${entryPath}, skipped`);
            } else {
                console.log(`Error processing ${entryPath}: ${error.message}, skipped`);
            }
            return null;
        }
    }

    try {
        // Get all entries in the directory
        const entries = await fsp.readdir(directory);
        const entryPaths = entries.map(entry => nodePath.join(directory, entry));

        // Process all entries concurrently
        const processPromises = entryPaths.map(entryPath => processEntry(entryPath));
        const results = await Promise.all(processPromises);

        // Filter out subdirectory paths
        const subdirs = results.filter((result): result is string => result !== null);

        // Process subdirectories recursively
        const subdirPromises = subdirs.map(subdir => calculateDirectorySize(subdir));
        const subdirSizes = await Promise.all(subdirPromises);

        // Add up all subdirectory sizes
        totalSize += subdirSizes.reduce((sum, size) => sum + size, 0);

        return totalSize;

    } catch (error: any) {
        if (error.code === 'EACCES') {
            throw new Error(`No permission to access directory: ${directory}`);
        } else {
            throw error;
        }
    }
}
