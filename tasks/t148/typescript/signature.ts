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
): T[] {}