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
): boolean {
    if (!objList || objList.length === 0) {
        return true; // Empty list - all elements are considered the same (vacuous truth)
    }

    comparator = comparator || ((a, b) => a === b);

    let firstVal: any;
    if (Object.prototype.hasOwnProperty.call(objList[0], attrName)) {
        firstVal = objList[0][attrName];
    } else {
        firstVal = defaultVal; // Use default value
    }

    for (let i = 1; i < objList.length; i++) {
        const obj = objList[i];
        const currentVal = Object.prototype.hasOwnProperty.call(obj, attrName) ? obj[attrName] : defaultVal;

        if (!comparator(currentVal, firstVal)) {
            return false;
        }
    }

    return true;
}