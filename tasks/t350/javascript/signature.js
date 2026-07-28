/**
 * Computes the bounding rectangle of an element and all its descendant elements.
 *
 * @param {Element} element - The parent element whose descendants' bounding box is calculated.
 * @param {boolean} [includeSelf=true] - Whether to include the element itself in the bounding box calculation.
 * @returns {{left: number, top: number, right: number, bottom: number, width: number, height: number}}
 *   The bounding rectangle including position and dimensions.
 */
function getBoundingRectWithDescendants(element, includeSelf = true) {}