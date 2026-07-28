package org.real.temp;

import java.util.HashMap;
import java.util.Map;

public class Answer {

    /**
     * Parse memory mapping line and return detailed mapping type classification
     *
     * @param mapsLine A line of memory mapping information from /proc/[pid]/maps
     * @return Dictionary containing mapping type, key is 'type', value is the specific classification
     */
    public static Map<String, String> classifyMemoryMapping(String mapsLine) {
        Map<String, String> result = new HashMap<>();

        // Split mapping line (split at most 5 times to preserve pathname integrity)
        String[] parts = mapsLine.trim().split("\\s+", 6);
        String pathname = parts.length >= 6 ? parts[5] : "";

        // Precisely identify special anonymous mapping types
        if (pathname.startsWith("[") && pathname.endsWith("]")) {
            String regionName = pathname.substring(1, pathname.length() - 1); // Extract content within []
            if ("heap".equals(regionName)) {
                result.put("type", "heap");
                return result;
            } else if ("stack".equals(regionName)) {
                result.put("type", "stack");
                return result;
            } else if ("vdso".equals(regionName)) { // Virtual Dynamic Shared Object
                result.put("type", "vdso");
                return result;
            } else if ("vvar".equals(regionName)) { // Virtual Variable Region
                result.put("type", "vvar");
                return result;
            } else {
                result.put("type", "anonymous"); // Other []-wrapped anonymous regions
                return result;
            }
        }

        // Identify anonymous mappings with empty pathname
        if (pathname.isEmpty()) {
            result.put("type", "anonymous");
            return result;
        }

        // Identify file-backed mappings
        if (pathname.startsWith("/")) {
            if (pathname.startsWith("/dev/")) {
                result.put("type", "device"); // Device file mapping
                return result;
            } else {
                result.put("type", "file"); // Regular file mapping
                return result;
            }
        }

        // Unrecognized type
        result.put("type", "unknown");
        return result;
    }
}
