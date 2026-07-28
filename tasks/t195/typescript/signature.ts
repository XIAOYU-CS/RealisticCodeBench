/**
 * Sorts an array of objects alphabetically based on a specified field.
 *
 * @param array - The array of objects to sort.
 * @param field - The field of the objects to sort by.
 * @param ascending - If true, sort in ascending order; if false, sort in descending order.
 * @returns The sorted array of objects.
 */
function sortByField<T extends Record<string, any>>(
  array: T[],
  field: keyof T,
  ascending: boolean = true
): T[] {}