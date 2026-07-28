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
): Array<T & { items: Array<T & { items: any[] }> }> {}