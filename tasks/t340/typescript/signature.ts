/**
 * Interface representing the structure of a changed file's data
 */
interface ChangedFileData {
    file_name: string;
    old_content: string;
    new_content: string;
    lines_added: number;
    lines_removed: number;
}
/**
 * Class representing a collection of changed files
 */
class ChangedFiles {
    /**
     * Create a ChangedFiles collection
     * @param {ChangedFileData[]} files - List of changed files data
     */
    constructor(public files: ChangedFileData[]) {}
}

/**
 * Parses Git diff string to extract changed files and count line changes
 * @param {string} diff - Git diff output string
 * @param {string} repoPath - Repository root directory path
 * @returns {ChangedFiles} Object containing information about changed files
 */
function gitDiffToChangedFiles(diff: string, repoPath: string): ChangedFiles {}