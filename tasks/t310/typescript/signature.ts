/**
 * Parse memory mapping line and return detailed mapping type classification
 *
 * @param maps_line - A line of memory mapping information from /proc/[pid]/maps
 * @returns Dictionary containing mapping type, key is 'type', value is the specific classification
 */
function classifyMemoryMapping(maps_line: string): { type: "anonymous" | "heap" | "stack" | "vdso" | "vvar" | "file" | "device" | "unknown" } {}