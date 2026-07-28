const nodeFs = require('fs');
const nodePath = require('path');
const glob = require('glob');

/**
 * Find JSON files containing the specified keyword, sort them, and load their contents.
 *
 * @param {string} parentDirectory - Parent directory path to search in
 * @param {string} keyword - Keyword to filter filenames
 * @returns {Array} - Array of JSON file contents. Each element corresponds to a file in sorted order.
 *                    Failed files are represented as null to maintain index correspondence.
 *
 * Note:
 * - Searches recursively in all subdirectories
 * - Files are sorted using default OS sorting
 * - Invalid JSON files or unreadable files are skipped with warnings
 */
function loadJsonFilesByKeyword(parentDirectory, keyword) {
    try {
        // Find all .json files in parentDirectory and subdirectories
        const pattern = nodePath.join(parentDirectory, '**', '*.json');
        let jsonFiles = [];

        // Use sync version for simplicity, in real application you might want async
        try {
            jsonFiles = glob.sync(pattern);
        } catch (error) {
            console.log("Warning: Error searching for files:", error.message);
            return [];
        }

        // Filter files whose basename contains the specified keyword
        const filteredFiles = jsonFiles.filter(file =>
            nodePath.basename(file).includes(keyword)
        );

        // Sort files using default OS sorting
        filteredFiles.sort();

        // Display numbered file list
        console.log("Found the following JSON files containing the keyword:");
        filteredFiles.forEach((filePath, idx) => {
            console.log(`${idx}: ${filePath}`);
        });

        // Read contents of all files, maintaining order correspondence
        const jsonContents = [];
        for (const filePath of filteredFiles) {
            try {
                const fileContent = nodeFs.readFileSync(filePath, 'utf8');
                const content = JSON.parse(fileContent);
                jsonContents.push(content);
            } catch (error) {
                if (error instanceof SyntaxError) {
                    console.log(`Warning: File ${filePath} is not valid JSON format, skipped`);
                } else {
                    console.log(`Warning: Error reading file ${filePath}: ${error.message}, skipped`);
                }
                jsonContents.push(null); // Preserve position to maintain index correspondence
            }
        }

        return jsonContents;
    } catch (error) {
        console.log(`Error in loadJsonFilesByKeyword: ${error.message}`);
        return [];
    }
}
