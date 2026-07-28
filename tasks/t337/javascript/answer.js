/**
 * Check if all objects in the list have the same value for the specified attribute
 *
 * @param {Array} objList - List of objects to check
 * @param {string} attrName - Name of the attribute to check
 * @param {Function} comparator - Custom comparison function that takes two values and returns boolean,
 *                               defaults to simple equality comparison
 * @param {*} defaultVal - Default value to use when an object is missing the attribute
 * @returns {boolean} Boolean indicating whether all objects have the same attribute value according to the comparison
 */
function allEqualAttr(objList, attrName, comparator = null, defaultVal = null) {
    if (!objList || objList.length === 0) {
        return true; // Empty list - all elements are considered the same (vacuous truth)
    }
    comparator = comparator || ((a, b) => a === b);

    let firstVal;
    if (objList[0].hasOwnProperty(attrName)) {
        firstVal = objList[0][attrName];
    } else {
        firstVal = defaultVal; // Use default value
    }

    for (let i = 1; i < objList.length; i++) {
        const obj = objList[i];
        const currentVal = obj.hasOwnProperty(attrName) ? obj[attrName] : defaultVal;
        if (!comparator(currentVal, firstVal)) {
            return false;
        }
    }

    return true;
}
