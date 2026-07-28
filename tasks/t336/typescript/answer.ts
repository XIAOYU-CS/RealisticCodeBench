import * as path from 'path';

/**
 * Check if the input string is a valid path format.
 * 
 * @param pathStr - The string to check for valid path format
 * @returns True if the string is a valid path format (absolute path or 
 *          relative path with at least two parts), False otherwise
 */
export function isValidPathFormat(pathStr: unknown): boolean {
    if (typeof pathStr !== 'string') {
        return false;
    }

    try {
        const isAbsolute = path.isAbsolute(pathStr);
        
        const parsedPath = path.parse(pathStr);
        const dirParts = parsedPath.dir.split(path.sep).filter(part => part !== '');
        const hasFileName = parsedPath.base && parsedPath.base !== '.' && parsedPath.base !== '..';
        
        const totalParts = dirParts.length + (hasFileName ? 1 : 0);
        
        return isAbsolute || totalParts > 1;
    } catch (error) {
        return false;
    }
}