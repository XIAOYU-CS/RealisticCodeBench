type BoundingRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

/**
 * Computes the bounding rectangle of an element and all its descendant elements.
 *
 * @param element - The parent element whose descendants' bounding box is calculated.
 * @param includeSelf - Whether to include the element itself in the bounding box calculation.
 * @returns The bounding rectangle including position and dimensions.
 */
function getBoundingRectWithDescendants(
  element: Element,
  includeSelf?: boolean
): BoundingRect {}