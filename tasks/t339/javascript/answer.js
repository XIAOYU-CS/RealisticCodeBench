const fs = require('fs').promises;
const path = require('path');
const { constants } = require('fs');

/**
 * Finds all picture files in specified directory with customizable extensions.
 *
 * @param {string} directory - Root directory to search. Defaults to '/media/'.
 * @param {string[]} [allowedExtensions] - List of allowed file extensions (e.g., ['.jpg', '.png']).
 *                                         Defaults to ['.jpg'] if not specified.
 * @returns {Promise<string[]>} Promise resolving to array of absolute paths of found picture files
 * @throws {Error} Throws error if directory is invalid or inaccessible
 */
async function getFotoFiles(directory = '/media/', allowedExtensions) {
    if (!allowedExtensions) {
        allowedExtensions = ['.jpg'];
    }
    const normalizedExtensions = allowedExtensions.map(ext => ext.toLowerCase());

    try {
        await fs.access(directory, constants.F_OK | constants.R_OK);
        const stats = await fs.stat(directory);
        if (!stats.isDirectory()) {
            throw new Error(`Not a directory: ${directory}`);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(`Directory does not exist: ${directory}`);
        } else if (err.code === 'EACCES') {
            throw new Error(`No read permission for directory: ${directory}`);
        } else {
            throw err;
        }
    }

    const fotoPaths = [];

    async function traverse(currentDir) {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await traverse(fullPath);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                if (normalizedExtensions.includes(ext)) {
                    fotoPaths.push(path.resolve(fullPath));
                }
            }
        }
    }

    await traverse(directory);

    return fotoPaths;
}