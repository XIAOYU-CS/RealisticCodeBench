import * as nodeFs from 'fs';
import * as nodePath from 'path';
import { promisify } from 'util';

const readdir = promisify(nodeFs.readdir);
const stat = promisify(nodeFs.stat);
const access = promisify(nodeFs.access);

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
): Promise<string[]> {
    try {
        await access(directory, nodeFs.constants.F_OK);
    } catch {
        throw new Error(`NotADirectoryError: Directory does not exist: ${directory}`);
    }

    try {
        const stats = await stat(directory);
        if (!stats.isDirectory()) {
            throw new Error(`NotADirectoryError: Not a directory: ${directory}`);
        }
    } catch (err) {
        throw err;
    }

    try {
        await access(directory, nodeFs.constants.R_OK);
    } catch {
        throw new Error(`PermissionError: No read permission for directory: ${directory}`);
    }

    if (!allowedExtensions) {
        allowedExtensions = ['.jpg'];
    }
    const normalizedExtensions = allowedExtensions.map(ext => ext.toLowerCase());

    const fotoPaths: string[] = [];

    async function traverse(currentDir: string) {
        const entries = await readdir(currentDir);

        for (const entry of entries) {
            const fullPath = nodePath.join(currentDir, entry);
            const entryStats = await stat(fullPath);

            if (entryStats.isDirectory()) {
                await traverse(fullPath);
            } else if (entryStats.isFile()) {
                const ext = nodePath.extname(entry).toLowerCase();
                if (normalizedExtensions.includes(ext)) {
                    fotoPaths.push(nodePath.resolve(fullPath));
                }
            }
        }
    }

    await traverse(directory);

    return fotoPaths;
}
