const fs = require('fs').promises;  // 注意这里使用的是 .promises
const path = require('path');

/**
 * Asynchronously calculate the total size (in bytes) of all files in the specified directory
 *
 * @param {string} directory - The directory path to calculate size for
 * @returns {Promise<number>} The total size (in bytes) of all files in the directory
 * @throws {Error} When directory does not exist, no permission to access, or path is not a directory
 */
async function calculateDirectorySize(directory) {
    try {
        // Check if directory exists and get stats
        const stats = await fs.stat(directory);

        // Check if it's actually a directory
        if (!stats.isDirectory()) {
            throw new Error(`${directory} is not a directory`);
        }
    } catch (error) {
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
     * @param {string} entryPath - The path of the entry to process
     * @returns {Promise<string|null>} Subdirectory path if it's a directory, null otherwise
     */
    async function processEntry(entryPath) {
        try {
            const stats = await fs.stat(entryPath);

            if (stats.isFile()) {
                // For files, add their size
                totalSize += stats.size;
                return null;
            } else if (stats.isDirectory()) {
                // For subdirectories, return path for later processing
                return entryPath;
            }
            return null;
        } catch (error) {
            if (error.code === 'EACCES') {
                console.log(`No permission to access: ${entryPath}, skipped`);
            } else {
                console.log(`Error processing ${entryPath}: ${error.message}, skipped`);
            }
            return null;
        }
    }

    try {
        const entries = await fs.readdir(directory);
        const entryPaths = entries.map(entry => path.join(directory, entry));
        const processPromises = entryPaths.map(entryPath => processEntry(entryPath));
        const results = await Promise.all(processPromises);
        const subdirs = results.filter(result => result !== null);
        const subdirPromises = subdirs.map(subdir => calculateDirectorySize(subdir));
        const subdirSizes = await Promise.all(subdirPromises);
        totalSize += subdirSizes.reduce((sum, size) => sum + size, 0);
        return totalSize;
    } catch (error) {
        if (error.code === 'EACCES') {
            throw new Error(`No permission to access directory: ${directory}`);
        } else {
            throw error;
        }
    }
}