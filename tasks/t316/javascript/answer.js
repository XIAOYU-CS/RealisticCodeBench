/**
 * Sort a list of objects by multiple fields with priority and handle missing fields.
 *
 * @param {Array} dictList - List of objects to be sorted
 * @param {Array} sortFields - List of arrays [field_name, ascending] for sorting
 *                              field_name (string): Name of the field to sort by
 *                              ascending (boolean): true for ascending order, false for descending
 * @param {string} missingStrategy - Strategy for handling missing fields
 *                                  'default' - Use default_value
 *                                  'first' - Missing fields come first
 *                                  'last' - Missing fields come last
 * @param {*} defaultValue - Default value when missing_strategy is 'default'
 *
 * @returns {Array} Sorted list of objects
 */
function sortDictsByFields(dictList, sortFields, missingStrategy = 'default', defaultValue = null) {
    /**
     * Generate sort key for an item.
     *
     * @param {Object} item - Object to generate sort key for
     * @returns {Array} Sort key array
     */
    function getSortKey(item) {
        const keyParts = [];

        for (const [fieldName, ascending] of sortFields) {
            let value;
            let hasValue = true;

            // Check if field exists
            if (fieldName in item) {
                value = item[fieldName];
            } else {
                hasValue = false;
                if (missingStrategy === 'default') {
                    value = defaultValue;
                } else if (missingStrategy === 'first') {
                    // Special marker for missing values that should come first
                    keyParts.push([-1, 0]); // -1 sorts before 0
                    continue;
                } else if (missingStrategy === 'last') {
                    // Special marker for missing values that should come last
                    keyParts.push([1, 0]); // 1 sorts after 0
                    continue;
                }
            }

            // Handle sort direction
            if (ascending) {
                keyParts.push([0, value]);
            } else {
                // For descending order with numeric values
                if (typeof value === 'number') {
                    keyParts.push([0, -value]);
                } else {
                    // For strings and other types in descending order
                    keyParts.push([0, value]);
                }
            }
        }

        return keyParts;
    }

    // Custom comparison function for sorting
    function compareArrays(a, b) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            const [aPrimary, aSecondary] = a[i];
            const [bPrimary, bSecondary] = b[i];

            // Compare primary values first
            if (aPrimary < bPrimary) return -1;
            if (aPrimary > bPrimary) return 1;

            // If primary values are equal, compare secondary values
            if (aSecondary !== bSecondary) {
                // Handle different types
                if (typeof aSecondary === 'string' && typeof bSecondary === 'string') {
                    if (!a[i][0] && a[i][0] === b[i][0]) { // Both ascending
                        return aSecondary.localeCompare(bSecondary);
                    } else if (a[i][0] && a[i][0] === b[i][0]) { // Both descending
                        return bSecondary.localeCompare(aSecondary);
                    } else {
                        return aSecondary.localeCompare(bSecondary);
                    }
                }

                if (aSecondary < bSecondary) return -1;
                if (aSecondary > bSecondary) return 1;
            }
        }
        return 0;
    }

    // Sort the array using custom comparison
    return [...dictList].sort((a, b) => {
        const keyA = getSortKey(a);
        const keyB = getSortKey(b);
        return compareArrays(keyA, keyB);
    });
}