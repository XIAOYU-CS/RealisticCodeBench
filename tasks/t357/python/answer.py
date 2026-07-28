def build_tree_with_sort(pages, sort_fn=None):
    """
    Build a tree structure from flat page data with optional sorting functionality.

    :param pages: List of page dictionaries to build tree from.
    :param sort_fn: Optional sorting function to sort nodes at each level.
    :return: Tree structure where each node contains an 'items' list for children.
    """
    if not isinstance(pages, list):
        raise ValueError("Pages must be a list")

    # Create a map of id -> node with 'items' initialized
    node_map = {}
    for page in pages:
        if not isinstance(page, dict):
            raise ValueError("Each page must be a dictionary")
        if 'id' not in page or page['id'] is None:
            raise ValueError("Each page must have an id property")
        node_map[page['id']] = {**page, 'items': []}

    # Build tree structure
    tree = []
    for page in pages:
        parent_id = page.get('parentFolder')
        node = node_map[page['id']]
        if parent_id is not None and parent_id in node_map:
            node_map[parent_id]['items'].append(node)
        elif parent_id is None or parent_id == '':
            tree.append(node)

    # Sorting functionality
    def sort_nodes(nodes):
        if callable(sort_fn):
            from functools import cmp_to_key
            nodes.sort(key=cmp_to_key(sort_fn))
        for node in nodes:
            if 'items' in node and isinstance(node['items'], list):
                sort_nodes(node['items'])

    sort_nodes(tree)
    return tree