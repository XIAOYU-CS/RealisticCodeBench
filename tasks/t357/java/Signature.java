/**
 * Build a tree structure from flat page data with optional sorting functionality.
 *
 * @param pages List of page maps to build tree from. Each map should contain at least an "id" key.
 *              Optional "parentFolder" key indicates the parent node id. Nodes without parentFolder
 *              or with null/empty parentFolder are considered root nodes.
 * @param sortFn Optional sorting function to sort nodes at each level of the tree.
 *               Takes two Node objects and returns negative/zero/positive integer for sorting.
 *               If null, no sorting is applied.
 * @return Tree structure where each node contains a list of child items in its 'items' field.
 * @throws IllegalArgumentException if pages is null, contains null elements, or pages without valid 'id' field
 */
public static List<Node> buildTreeWithSort(List<Map<String, Object>> pages,
                                          BiFunction<Node, Node, Integer> sortFn) {}