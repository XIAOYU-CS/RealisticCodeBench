/**
 * Represents a page object with hierarchical structure support
 */
interface Page {
  id: string | number;
  parentFolder?: string | number | null;
  items?: Page[];
  [key: string]: any;
}

/**
 * Type definition for the sorting function
 */
type SortFunction<T extends Page> = (a: T, b: T) => number;

/**
 * Build a tree structure from flat page data with optional sorting functionality
 *
 * This function takes an array of page objects and constructs a hierarchical tree structure
 * based on parent-child relationships. Each node can have child items stored in an 'items' array.
 * The function also supports custom sorting at all levels of the tree.
 *
 * @template T - Type extending Page interface
 * @param {Array<T>} pages - Array of page objects to build tree from
 * @param {SortFunction<T>} [sortFn] - Optional sorting function to sort nodes at each level
 * @returns {Array<T & { items: Array<T & { items: any[] }> }>} Tree structure where each node contains an 'items' array for children
 * @throws {Error} If input is invalid or pages have missing id properties
 *
 * @example
 * const pages = [
 *   { id: 1, parentFolder: null, name: 'Root' },
 *   { id: 2, parentFolder: 1, name: 'Child 1' },
 *   { id: 3, parentFolder: 1, name: 'Child 2' }
 * ];
 * const tree = buildTreeWithSort(pages);
 */
function buildTreeWithSort<T extends Page>(
  pages: T[],
  sortFn?: SortFunction<T>
): Array<T & { items: Array<T & { items: any[] }> }> {
  // Input validation
  if (!Array.isArray(pages)) {
    throw new Error('Pages must be an array');
  }

  const map = new Map<string | number, T & { items: Array<T & { items: any[] }> }>();
  const tree: Array<T & { items: Array<T & { items: any[] }> }> = [];

  // Initialize map with all pages
  pages.forEach((page) => {
    if (!page || typeof page.id === 'undefined') {
      throw new Error('Each page must have an id property');
    }
    map.set(page.id, { ...page, items: [] });
  });

  // Build tree structure
  pages.forEach((page) => {
    if (page.parentFolder !== undefined && page.parentFolder !== null) {
      const parent = map.get(page.parentFolder);
      if (parent) {
        parent.items.push(map.get(page.id)!);
      }
    } else {
      tree.push(map.get(page.id)!);
    }
  });

  // Recursive sorting function
  const sortNodes = (nodes: Array<T & { items: Array<T & { items: any[] }> }>) => {
    if (typeof sortFn === 'function') {
      nodes.sort(sortFn);
    }
    nodes.forEach(node => {
      if (node.items && Array.isArray(node.items)) {
        sortNodes(node.items);
      }
    });
  };

  sortNodes(tree);
  return tree;
}