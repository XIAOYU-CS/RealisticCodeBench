/**
 * Parse memory mapping line and return detailed mapping type classification
 *
 * @param maps_line - A line of memory mapping information from /proc/[pid]/maps
 * @returns Dictionary containing mapping type, key is 'type', value is the specific classification
 */
function classifyMemoryMapping(maps_line: string): { type: "anonymous" | "heap" | "stack" | "vdso" | "vvar" | "file" | "device" | "unknown" } {
    // Split mapping line (split at most 5 times to preserve pathname integrity)
    const parts = maps_line.trim().split(/\s+/, 6);
    const pathname = parts.length >= 6 ? parts[5] : '';

    // Precisely identify special anonymous mapping types
    if (pathname.startsWith('[') && pathname.endsWith(']')) {
        const region_name = pathname.slice(1, -1); // Extract content within []
        if (region_name === 'heap') {
            return {type: 'heap'};
        } else if (region_name === 'stack') {
            return {type: 'stack'};
        } else if (region_name === 'vdso') { // Virtual Dynamic Shared Object
            return {type: 'vdso'};
        } else if (region_name === 'vvar') { // Virtual Variable Region
            return {type: 'vvar'};
        } else {
            return {type: 'anonymous'}; // Other []-wrapped anonymous regions
        }
    }

    // Identify anonymous mappings with empty pathname
    if (!pathname) {
        return {type: 'anonymous'};
    }

    // Identify file-backed mappings
    if (pathname.startsWith('/')) {
        if (pathname.startsWith('/dev/')) {
            return {type: 'device'}; // Device file mapping
        } else {
            return {type: 'file'}; // Regular file mapping
        }
    }

    // Unrecognized type
    return {type: 'unknown'};
}