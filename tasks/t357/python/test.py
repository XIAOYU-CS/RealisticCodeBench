import unittest

class TestBuildTreeWithSort(unittest.TestCase):

    def test_basic_tree_structure_building(self):
        pages = [
            {'id': 1, 'parentFolder': None, 'name': 'Root'},
            {'id': 2, 'parentFolder': 1, 'name': 'Child 1'},
            {'id': 3, 'parentFolder': 1, 'name': 'Child 2'},
            {'id': 4, 'parentFolder': 2, 'name': 'Grandchild 1'}
        ]
        result = build_tree_with_sort(pages)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]['id'], 1)
        self.assertEqual(result[0]['name'], 'Root')
        self.assertEqual(len(result[0]['items']), 2)
        self.assertEqual(result[0]['items'][0]['id'], 2)
        self.assertEqual(result[0]['items'][0]['name'], 'Child 1')
        self.assertEqual(len(result[0]['items'][0]['items']), 1)
        self.assertEqual(result[0]['items'][0]['items'][0]['id'], 4)
        self.assertEqual(result[0]['items'][1]['id'], 3)
        self.assertEqual(result[0]['items'][1]['name'], 'Child 2')
        self.assertEqual(len(result[0]['items'][1]['items']), 0)

    def test_multiple_root_nodes(self):
        pages = [
            {'id': 1, 'parentFolder': None, 'name': 'Root 1'},
            {'id': 2, 'parentFolder': None, 'name': 'Root 2'},
            {'id': 3, 'parentFolder': 1, 'name': 'Child of Root 1'},
            {'id': 4, 'parentFolder': 2, 'name': 'Child of Root 2'}
        ]
        result = build_tree_with_sort(pages)
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['id'], 1)
        self.assertEqual(result[0]['name'], 'Root 1')
        self.assertEqual(result[1]['id'], 2)
        self.assertEqual(result[1]['name'], 'Root 2')
        self.assertEqual(len(result[0]['items']), 1)
        self.assertEqual(len(result[1]['items']), 1)
        self.assertEqual(result[0]['items'][0]['id'], 3)
        self.assertEqual(result[1]['items'][0]['id'], 4)

    def test_sorting_functionality(self):
        pages = [
            {'id': 1, 'parentFolder': None, 'name': 'Z Root', 'order': 2},
            {'id': 2, 'parentFolder': None, 'name': 'A Root', 'order': 1},
            {'id': 3, 'parentFolder': 1, 'name': 'Z Child', 'order': 2},
            {'id': 4, 'parentFolder': 1, 'name': 'A Child', 'order': 1},
            {'id': 5, 'parentFolder': 2, 'name': 'B Child', 'order': 1}
        ]
        def sort_by_name(a, b):
            if a['name'] < b['name']:
                return -1
            elif a['name'] > b['name']:
                return 1
            else:
                return 0

        result_by_name = build_tree_with_sort(pages, sort_by_name)
        self.assertEqual(result_by_name[0]['name'], 'A Root')
        self.assertEqual(result_by_name[1]['name'], 'Z Root')
        self.assertEqual(result_by_name[1]['items'][0]['name'], 'A Child')
        self.assertEqual(result_by_name[1]['items'][1]['name'], 'Z Child')
        self.assertEqual(result_by_name[0]['items'][0]['name'], 'B Child')

        def sort_by_order(a, b):
            return a['order'] - b['order']

        result_by_order = build_tree_with_sort(pages, sort_by_order)
        self.assertEqual(result_by_order[0]['name'], 'A Root')
        self.assertEqual(result_by_order[1]['name'], 'Z Root')

    def test_empty_and_edge_cases(self):
        self.assertEqual(build_tree_with_sort([]), [])

        root_only_pages = [
            {'id': 1, 'parentFolder': None, 'name': 'Root 1'},
            {'id': 2, 'parentFolder': None, 'name': 'Root 2'}
        ]
        result = build_tree_with_sort(root_only_pages)
        self.assertEqual(len(result), 2)
        self.assertEqual(len(result[0]['items']), 0)
        self.assertEqual(len(result[1]['items']), 0)

        pages_with_orphans = [
            {'id': 1, 'parentFolder': None, 'name': 'Root'},
            {'id': 2, 'parentFolder': 999, 'name': 'Orphan'},
            {'id': 3, 'parentFolder': 1, 'name': 'Valid Child'}
        ]
        result = build_tree_with_sort(pages_with_orphans)
        self.assertEqual(len(result), 1)
        self.assertEqual(len(result[0]['items']), 1)
        self.assertEqual(result[0]['items'][0]['name'], 'Valid Child')

    def test_input_validation_and_error_handling(self):
        valid_pages = [
            {'id': 1, 'name': 'Page 1'},
            {'id': 2, 'name': 'Page 2'}
        ]
        result = build_tree_with_sort(valid_pages)
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['id'], 1)
        self.assertEqual(result[1]['id'], 2)
        self.assertEqual(len(result[0]['items']), 0)
        self.assertEqual(len(result[1]['items']), 0)