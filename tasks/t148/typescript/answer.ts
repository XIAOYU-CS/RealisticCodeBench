/**
 * Removes elements from an array based on specified criteria.
 *
 * @param array - The array to remove elements from
 * @param element - The element to be removed
 * @param options - Configuration options
 * @returns A new array with specified elements removed
 * @throws {TypeError} If the first argument is not an array
 * @throws {Error} If mode is not one of 'first', 'all', or 'limit'
 * @throws {Error} If limit is not a positive integer when mode is 'limit'
 */
interface RemoveElementsOptions {
    /** Removal mode: 'first', 'all', or 'limit' */
    mode?: 'first' | 'all' | 'limit';
    /** Number of elements to remove when mode is 'limit' */
    limit?: number;
    /** Whether to use strict equality (===) or loose equality (==) */
    useStrict?: boolean;
}

function removeElements<T>(
    array: T[],
    element: T,
    options: RemoveElementsOptions = {}
): T[] {
    // Type checking
    if (!Array.isArray(array)) {
        throw new TypeError('第一个参数必须是数组');
    }

    // Default configuration: remove first only, use strict comparison
    const {
        mode = 'first',    // Mode: 'first' (default), 'all', 'limit'
        limit = 1,         // Takes effect when mode is 'limit', specifies removal count
        useStrict = true   // Whether to use strict comparison
    } = options;

    // Validate configuration legality
    if (!['first', 'all', 'limit'].includes(mode)) {
        throw new Error("mode参数必须是 'first', 'all' 或 'limit'");
    }
    if (mode === 'limit' && (!Number.isInteger(limit) || limit < 1)) {
        throw new Error("当mode为'limit'时，limit必须是大于0的整数");
    }

    // Return empty array directly if input is empty
    if (array.length === 0) {
        return [];
    }

    const newArray: T[] = [];
    let removedCount = 0;
    const maxRemove = mode === 'all' ? Infinity : (mode === 'limit' ? limit : 1);

    for (const item of array) {
        // Check for match
        const isNaNMatch = Number.isNaN(element as unknown as number) && Number.isNaN(item as unknown as number);
        const isMatch = useStrict ? item === element : item == element;
        const shouldRemove = (isMatch || isNaNMatch) && removedCount < maxRemove;

        if (shouldRemove) {
            removedCount++;
        } else {
            newArray.push(item);
        }
    }

    // Return a shallow copy of the original array if no elements were removed
    return removedCount > 0 ? newArray : [...array];
}

export { removeElements, type RemoveElementsOptions };