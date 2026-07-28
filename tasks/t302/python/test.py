import unittest

class TestCustomFormatFilePath(unittest.TestCase):

    def test_default_behavior(self):
        path = "/artifacts/workspace/project_items/"
        result = custom_format_file_path(path)
        self.assertEqual(result, "artifacts_workspace_project_items")

    def test_custom_separators_and_replacements(self):
        path = "bundle\\include\\my_file"
        result = custom_format_file_path(
            path,
            sep="\\",
            replace_char="-",
            strip_chars=""
        )
        self.assertEqual(result, "bundle-include-my_file")

    def test_custom_remove_items_and_suffixes(self):
        path = "src/resources/data_logs_v2"
        result = custom_format_file_path(
            path,
            remove_items=["src", "logs"],
            extra_suffixes=["_v2", "_data"]
        )
        self.assertEqual(result, "resources")

    def test_empty_path_and_edge_cases(self):
        self.assertEqual(custom_format_file_path(""), "")
        self.assertEqual(custom_format_file_path("////"), "")
        self.assertEqual(custom_format_file_path("properties/items"), "properties_items")

    def test_strip_chars_behavior(self):
        path = "__resources/project__"
        self.assertEqual(custom_format_file_path(path), "resources_project")

        path = "--bundle/data--"
        result = custom_format_file_path(
            path,
            strip_chars="-",
            remove_items=["bundle"]
        )
        self.assertEqual(result, "data")
