describe('checkPermissions', () => {
    test('owner permissions read write', () => {
        const line = "-rw-r--r-- 1 user group 1024 Jan 1 12:00 file.txt";
        const result = checkPermissions(line, ["r", "w"], "owner");
        expect(result).toBe(true);
    });

    test('group permissions execute only', () => {
        const line = "-rwx--x--x 1 user group 1024 Jan 1 12:00 script.sh";
        const result = checkPermissions(line, ["x"], "group");
        expect(result).toBe(true);
    });

    test('other permissions no read access', () => {
        const line = "-rwxrwx--- 1 user group 1024 Jan 1 12:00 private_file.txt";
        const result = checkPermissions(line, ["r"], "other");
        expect(result).toBe(false);
    });

    test('default no required permissions', () => {
        const line = "-rwxr-xr-- 1 user group 1024 Jan 1 12:00 file.txt";
        const result = checkPermissions(line);
        expect(result).toBe(true);
    });

    test('invalid permission format', () => {
        const line = "invalid_line_without_proper_permissions";
        const result = checkPermissions(line, ["r"], "owner");
        expect(result).toBe(false);
    });
});