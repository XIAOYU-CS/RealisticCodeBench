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