def build_tree_with_sort(pages, sort_fn=None)->list:
    """
    Build a tree structure from flat page data with optional sorting functionality.

    Args:
        pages: List of page dictionaries to build tree from.
        sort_fn: Optional sorting function to sort nodes at each level.

    Returns:
        Tree structure where each node contains an 'items' list for children.
    """