import unittest

class Testfind_all_shortest_paths_using_dijkstraAlgorithm(unittest.TestCase):

    def setUp(self):
        self.graph1 = {
            'A': [('B', 1), ('C', 4)],
            'B': [('A', 1), ('C', 2), ('D', 5)],
            'C': [('A', 4), ('B', 2), ('D', 1)],
            'D': [('B', 5), ('C', 1)],
        }

        self.graph2 = {
            'A': [('B', 2)],
            'B': [('A', 2), ('C', 3)],
            'C': [('B', 3), ('D', 1)],
            'D': [('C', 1)],
        }

        self.graph_with_isolated_node = {
            'A': [('B', 1)],
            'B': [('A', 1)],
            'C': [],  # Isolated node
        }

        self.graph_with_negative_weight = {
            'A': [('B', 2), ('C', 1)],
            'B': [('D', 3)],
            'C': [('B', -1), ('D', 4)],
            'D': [],
        }

    def test_shortest_paths_graph1(self):
        expected = {'A': 0, 'B': 1, 'C': 3, 'D': 4}
        result = find_all_shortest_paths_using_dijkstra(self.graph1, 'A')
        self.assertEqual(result, expected)

    def test_shortest_paths_graph2(self):
        expected = {'A': 0, 'B': 2, 'C': 5, 'D': 6}
        result = find_all_shortest_paths_using_dijkstra(self.graph2, 'A')
        self.assertEqual(result, expected)

    def test_shortest_paths_with_isolated_node(self):
        expected = {'A': 0, 'B': 1, 'C': float('inf')}
        result = find_all_shortest_paths_using_dijkstra(self.graph_with_isolated_node, 'A')
        self.assertEqual(result, expected)


    def test_starting_at_isolated_node(self):
        expected = {'C': 0, 'A': float('inf'), 'B': float('inf')}
        result = find_all_shortest_paths_using_dijkstra(self.graph_with_isolated_node, 'C')
        self.assertEqual(result, expected)

    def test_single_node_graph(self):
        graph = {'A': []}
        expected = {'A': 0}
        result = find_all_shortest_paths_using_dijkstra(graph, 'A')
        self.assertEqual(result, expected)
