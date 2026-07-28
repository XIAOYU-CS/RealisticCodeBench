/**
 * Computes the bounding rectangle of an element and all its descendant elements.
 *
 * @param {Element} element - The parent element whose descendants' bounding box is calculated.
 * @param {boolean} [includeSelf=true] - Whether to include the element itself in the bounding box calculation.
 * @returns {{left: number, top: number, right: number, bottom: number, width: number, height: number}}
 *   The bounding rectangle including position and dimensions.
 */
function getBoundingRectWithDescendants(element, includeSelf = true) {
  // Initialize bounding box limits
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  // If including the element itself, use its bounding rect as initial values
  if (includeSelf) {
    const selfRect = element.getBoundingClientRect();
    left = selfRect.left;
    top = selfRect.top;
    right = selfRect.right;
    bottom = selfRect.bottom;
  }

  /**
   * Recursively traverses the DOM subtree and expands the bounding box
   * to include the bounding rectangles of all descendant elements.
   *
   * @param {Element} node - The current node being traversed.
   */
  function traverse(node) {
    const nodeRect = node.getBoundingClientRect();

    left = Math.min(left, nodeRect.left);
    top = Math.min(top, nodeRect.top);
    right = Math.max(right, nodeRect.right);
    bottom = Math.max(bottom, nodeRect.bottom);

    // Recursively process all child elements
    for (const child of node.children) {
      traverse(child);
    }
  }

  // Traverse all direct children and their descendants
  for (const child of element.children) {
    traverse(child);
  }

  // In case no elements were processed (e.g., no children and !includeSelf), ensure valid values
  if (left === Infinity) {
    left = right = top = bottom = 0;
  }

  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top
  };
}