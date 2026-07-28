type SortField = [string, boolean]; // [fieldName, ascending]
type MissingStrategy = 'default' | 'first' | 'last';

/**
 * Sort a list of objects by multiple fields with priority and handle missing fields.
 *
 * @param dictList - List of objects to be sorted
 * @param sortFields - List of [field_name, ascending] for sorting
 * @param missingStrategy - Strategy for handling missing fields ('default', 'first', 'last')
 * @param defaultValue - Default value when missing_strategy is 'default'
 * @returns Sorted list of objects
 */
function sortDictsByFields<T extends Record<string, any>>(
    dictList: T[],
    sortFields: SortField[],
    missingStrategy: MissingStrategy = 'default',
    defaultValue: any = null
): T[] {
    /**
     * Generate sort key for an item.
     */
    function getSortKey(item: T): [number, any][] {
        const keyParts: [number, any][] = [];

        for (const [fieldName, ascending] of sortFields) {
            let value: any;
            let hasValue = Object.prototype.hasOwnProperty.call(item, fieldName);

            if (hasValue) {
                value = item[fieldName];
            } else {
                if (missingStrategy === 'default') {
                    value = defaultValue;
                } else if (missingStrategy === 'first') {
                    keyParts.push([-1, 0]); // Missing comes first
                    continue;
                } else if (missingStrategy === 'last') {
                    keyParts.push([1, 0]); // Missing comes last
                    continue;
                }
            }

            // Handle sort direction
            if (ascending) {
                keyParts.push([0, value]);
            } else {
                if (typeof value === 'number') {
                    keyParts.push([0, -value]);
                } else {
                    keyParts.push([0, value]);
                }
            }
        }

        return keyParts;
    }

    /**
     * Compare two arrays of sort keys.
     */
    function compareArrays(a: [number, any][], b: [number, any][]): number {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            const [aPrimary, aSecondary] = a[i];
            const [bPrimary, bSecondary] = b[i];

            if (aPrimary !== bPrimary) {
                return aPrimary - bPrimary;
            }

            if (aSecondary !== bSecondary) {
                if (typeof aSecondary === 'string' && typeof bSecondary === 'string') {
                    return aSecondary.localeCompare(bSecondary);
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