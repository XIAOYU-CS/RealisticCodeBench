/**
 * Processes path strings to generate simplified names, supporting custom rules while preserving default behavior
 *
 * @param {string} path - Input path string
 * @param {string} [sep="/"] - Separator in the path
 * @param {string} [replaceChar="_"] - Character to replace separators with
 * @param {string} [stripChars="_"] - Characters to strip from the start and end
 * @param {string[]|null} [removeItems=null] - List of keywords to remove (only processed if provided)
 * @param {string[]|null} [extraSuffixes=null] - Additional suffixes to remove (only processed if provided)
 * @returns {string} Processed simplified name
 */
function customFormatFilePath(
    path,
    sep = "/",
    replaceChar = "_",
    stripChars = "_",
    removeItems = null,
    extraSuffixes = null
) {
    let newPath = path.replace(new RegExp(sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceChar);

    if (stripChars) {
        const stripCharsRegex = new RegExp(`^[${stripChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+|[${stripChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+$`, 'g');
        newPath = newPath.replace(stripCharsRegex, '');
    }

    if (removeItems !== null) {
        for (const item of removeItems) {
            const pattern = `${item}${replaceChar}`;
            newPath = newPath.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "");
        }
    }

    if (extraSuffixes !== null) {
        for (const suffix of extraSuffixes) {
            newPath = newPath.replace(new RegExp(suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "");
        }
    }

    return newPath;
}

// TEST CASE
describe('customFormatFilePath', () => {

    test('default behavior', () => {
        const path = "/artifacts/workspace/project_items/";
        const result = customFormatFilePath(path);
        expect(result).toBe("artifacts_workspace_project_items");
    });

    test('custom separators and replacements', () => {
        const path = "bundle\\include\\my_file";
        const result = customFormatFilePath(
            path,
            "\\",
            "-",
            ""
        );
        expect(result).toBe("bundle-include-my_file");
    });

    test('custom remove items and suffixes', () => {
        const path = "src/resources/data_logs_v2";
        const result = customFormatFilePath(
            path,
            "/",
            "_",
            "_",
            ["src", "logs"],
            ["_v2", "_data"]
        );
        expect(result).toBe("resources");
    });

    test('empty path and edge cases', () => {
        expect(customFormatFilePath("")).toBe("");
        expect(customFormatFilePath("////")).toBe("");
        expect(customFormatFilePath("properties/items")).toBe("properties_items");
    });

    test('strip chars behavior', () => {
        const path = "__resources/project__";
        expect(customFormatFilePath(path)).toBe("resources_project");

        const path2 = "--bundle/data--";
        const result = customFormatFilePath(
            path2,
            "/",
            "_",
            "-",
            ["bundle"],
            null
        );
        expect(result).toBe("data");
    });
});