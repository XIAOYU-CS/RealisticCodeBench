type BoundingRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

function getBoundingRectWithDescendants(
  element: Element,
  includeSelf: boolean = true
): BoundingRect {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  const includeRect = (rect: Pick<BoundingRect, "left" | "top" | "right" | "bottom">): void => {
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
  };

  const visit = (node: Element): void => {
    includeRect(node.getBoundingClientRect());
    for (const child of Array.from(node.children)) {
      visit(child);
    }
  };

  if (includeSelf) {
    includeRect(element.getBoundingClientRect());
  }
  for (const child of Array.from(element.children)) {
    visit(child);
  }

  if (left === Infinity) {
    left = top = right = bottom = 0;
  }

  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}
