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
function buildTreeWithSort(pages, sortFn) {
  // Validate input
  if (!Array.isArray(pages)) {
    throw new Error('Pages must be an array');
  }

  const map = new Map();
  const tree = [];

  // Initialize map, add items array to each page
  pages.forEach((page) => {
    if (!page || typeof page.id === 'undefined') {
      throw new Error('Each page must have an id property');
    }
    map.set(page.id, { ...page, items: [] });
  });

  // Build tree structure
  pages.forEach((page) => {
    if (page.parentFolder) {
      // Add page to its parent node's items
      const parent = map.get(page.parentFolder);
      if (parent) {
        parent.items.push(map.get(page.id));
      }
      // Note: If parent doesn't exist, the node is effectively ignored
    } else {
      // Root nodes are added directly to tree
      tree.push(map.get(page.id));
    }
  });

  // New feature: Sorting functionality - recursively sort all levels of nodes
  const sortNodes = (nodes) => {
    // If sorting function is provided, sort current level nodes
    if (typeof sortFn === 'function') {
      nodes.sort(sortFn);
    }
    // Recursively sort child nodes
    nodes.forEach(node => {
      if (node.items && Array.isArray(node.items)) {
        sortNodes(node.items);
      }
    });
  };

  // Execute sorting
  sortNodes(tree);

  return tree;
}