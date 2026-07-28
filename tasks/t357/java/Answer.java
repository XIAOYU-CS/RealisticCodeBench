package org.real.temp;

import java.util.*;
import java.util.function.BiFunction;

public class Answer {

    public static class Node {
        private Map<String, Object> data;
        private List<Node> items;

        public Node(Map<String, Object> data) {
            this.data = new HashMap<>(data);
            this.items = new ArrayList<>();
        }

        public Object getId() {
            return data.get("id");
        }

        public Object getParentFolder() {
            return data.get("parentFolder");
        }

        public Map<String, Object> getData() {
            return data;
        }

        public List<Node> getItems() {
            return items;
        }

        public void addItem(Node item) {
            this.items.add(item);
        }
    }
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
                                              BiFunction<Node, Node, Integer> sortFn) {
        if (pages == null) {
            throw new IllegalArgumentException("Pages must be a list");
        }

        // Create a map of id -> node with 'items' initialized
        Map<Object, Node> nodeMap = new HashMap<>();
        for (Map<String, Object> page : pages) {
            if (page == null) {
                throw new IllegalArgumentException("Each page must be a dictionary");
            }
            if (!page.containsKey("id") || page.get("id") == null) {
                throw new IllegalArgumentException("Each page must have an id property");
            }
            nodeMap.put(page.get("id"), new Node(page));
        }

        // Build tree structure
        List<Node> tree = new ArrayList<>();
        for (Map<String, Object> page : pages) {
            Object parentId = page.get("parentFolder");
            Node node = nodeMap.get(page.get("id"));

            if (parentId != null && nodeMap.containsKey(parentId)) {
                nodeMap.get(parentId).addItem(node);
            } else if (parentId == null || "".equals(parentId)) {
                tree.add(node);
            }
        }

        // Sorting functionality
        sortNodes(tree, sortFn);
        return tree;
    }

    public static List<Node> buildTreeWithSort(List<Map<String, Object>> pages) {
        return buildTreeWithSort(pages, null);
    }

    private static void sortNodes(List<Node> nodes, BiFunction<Node, Node, Integer> sortFn) {
        if (sortFn != null && !nodes.isEmpty()) {
            nodes.sort((a, b) -> sortFn.apply(a, b));
        }

        for (Node node : nodes) {
            if (node.getItems() != null) {
                sortNodes(node.getItems(), sortFn);
            }
        }
    }
}