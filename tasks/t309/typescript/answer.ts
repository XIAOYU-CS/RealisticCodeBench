/**
 * Check if the permission string meets the specified read/write/execute permission requirements
 *
 * @param line - Line containing permission information, typically from 'ls -l' command output.
 *               Expected format: "-rwxr-xr-- 1 user group 1024 Jan 1 12:00 filename"
 * @param required_perms - List of required permissions, e.g., ["r", "x"] means read and execute permissions are needed
 * @param user_category - User category to check (owner/group/other users)
 * @returns Whether all specified permission requirements are met
 */
function checkPermissions(
    line: string,
    required_perms: ("r" | "w" | "x")[] = [],
    user_category: "owner" | "group" | "other" = "other"
): boolean {
    // Extract permission string (assuming format like -rwxr-xr--)
    const parts = line.split(' ');
    if (parts.length === 0) {
        return false;
    }

    const perms = parts[0]; // Permission string is the first field in ls -l output
    if (perms.length < 9) {
        return false;
    }

    // Determine the permission positions to check (owner:0-2, group:3-5, other:6-8)
    const category_map: Record<string, [number, number]> = {
        "owner": [0, 3],
        "group": [3, 6],
        "other": [6, 9]
    };

    const [start, end] = category_map[user_category];
    const target_perms = perms.slice(start, end);

    // Check if all specified permissions are met
    for (const perm of required_perms) {
        if (!target_perms.includes(perm)) {
            return false;
        }
    }
    return true;
}