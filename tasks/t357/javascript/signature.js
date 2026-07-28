/**
 * Build a tree structure from flat page data with optional sorting functionality
 *
 * This function takes an array of page objects and constructs a hierarchical tree structure
 * based on parent-child relationships. Each node can have child items stored in an 'items' array.
 * The function also supports custom sorting at all levels of the tree.
 *
 * @param {Array<Object>} pages - Array of page objects to build tree from
 * @param {Object} pages[].id - Unique identifier for the page
 * @param {string|number|null|undefined} pages[].parentFolder - Parent folder ID (null/undefined for root nodes)
 * @param {Function} [sortFn] - Optional sorting function to sort nodes at each level
 * @param {Function} sortFn.compareFunction - Standard JavaScript compare function that takes two nodes
 * @returns {Array<Object>} Tree structure where each node contains an 'items' array for children
 *
 * @example
 * const pages = [
 *   { id: 1, parentFolder: null, name: 'Root' },
 *   { id: 2, parentFolder: 1, name: 'Child 1' },
 *   { id: 3, parentFolder: 1, name: 'Child 2' }
 * ];
 * const tree = buildTreeWithSort(pages);
 */
function buildTreeWithSort(pages, sortFn) {}