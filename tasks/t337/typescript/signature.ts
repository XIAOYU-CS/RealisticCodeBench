/**
 * Check if all objects in the list have the same value for the specified attribute
 *
 * @param objList - List of objects to check
 * @param attrName - Name of the attribute to check
 * @param comparator - Custom comparison function that takes two values and returns boolean,
 *                     defaults to simple equality comparison
 * @param defaultVal - Default value to use when an object is missing the attribute
 * @returns Boolean indicating whether all objects have the same attribute value according to the comparison
 */
function allEqualAttr<T extends Record<string, any>>(
    objList: T[],
    attrName: string,
    comparator: ((a: any, b: any) => boolean) | null = null,
    defaultVal: any = null
): boolean {}