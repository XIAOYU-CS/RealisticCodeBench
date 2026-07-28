import unittest
import tempfile
import json
from pathlib import Path
class TestLoadJsonFilesByKeyword(unittest.TestCase):

    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.test_dir = Path(self.temp_dir.name)

        self.valid_json_files = {
            'data_apple_1.json': {'name': 'apple', 'value': 1},
            'config_apple_2.json': {'setting': 'dark_mode', 'enabled': True},
            'info_banana.json': {'fruit': 'banana', 'color': 'yellow'},
            'subdir/data_apple_3.json': {'nested': True, 'data': [1, 2, 3]},
            'subdir/config_orange.json': {'type': 'citrus', 'sweetness': 8},
        }

        for file_path, content in self.valid_json_files.items():
            full_path = self.test_dir / file_path
            full_path.parent.mkdir(parents=True, exist_ok=True)
            with open(full_path, 'w', encoding='utf-8') as f:
                json.dump(content, f)

        invalid_file = self.test_dir / 'invalid_apple.json'
        with open(invalid_file, 'w', encoding='utf-8') as f:
            f.write('{"invalid": json}')  # Invalid JSON syntax

        txt_file = self.test_dir / 'readme_apple.txt'
        with open(txt_file, 'w', encoding='utf-8') as f:
            f.write('This is a text file')

    def tearDown(self):
        self.temp_dir.cleanup()


    def test_keyword_not_found(self):
        result = load_json_files_by_keyword(str(self.test_dir), 'grape')
        self.assertEqual(result, [])

    def test_empty_directory(self):
        empty_dir = self.test_dir / 'empty'
        empty_dir.mkdir()
        result = load_json_files_by_keyword(str(empty_dir), 'test')
        self.assertEqual(result, [])

    def test_invalid_json_file_handling(self):
        result = load_json_files_by_keyword(str(self.test_dir), 'invalid')

        # Should find 1 file but return None for it
        self.assertEqual(len(result), 1)
        self.assertIsNone(result[0])

    def test_nonexistent_directory(self):
        nonexistent_dir = '/path/that/does/not/exist'
        result = load_json_files_by_keyword(nonexistent_dir, 'test')
        self.assertEqual(result, [])

    def test_nested_directory_search(self):
        result = load_json_files_by_keyword(str(self.test_dir), 'config')

        self.assertEqual(len(result), 2)

        expected_contents = [
            {'setting': 'dark_mode', 'enabled': True},  # config_apple_2.json
            {'type': 'citrus', 'sweetness': 8}  # subdir/config_orange.json
        ]

        self.assertIn(result[0], expected_contents)
        self.assertIn(result[1], expected_contents)

    def test_case_sensitive_search(self):
        uppercase_file = self.test_dir / 'DATA_APPLE_UPPER.json'
        with open(uppercase_file, 'w', encoding='utf-8') as f:
            json.dump({'uppercase': True}, f)

        result = load_json_files_by_keyword(str(self.test_dir), 'data_apple')
        lowercase_files = [r for r in result if r is not None]
        self.assertTrue(all('uppercase' not in (item or {}).keys() for item in result))

    def test_special_characters_in_keyword(self):
        special_file = self.test_dir / 'data_test-special_1.json'
        with open(special_file, 'w', encoding='utf-8') as f:
            json.dump({'special': True}, f)

        result = load_json_files_by_keyword(str(self.test_dir), 'test-special')
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0], {'special': True})

    def test_empty_keyword(self):
        try:
            result = load_json_files_by_keyword(str(self.test_dir), '')
            self.assertGreaterEqual(len(result), 5)  
        except Exception as e:
            self.fail(f"Empty keyword caused exception: {e}")

    def test_unicode_keyword(self):
        unicode_file = self.test_dir / '数据_apple_中文.json'
        with open(unicode_file, 'w', encoding='utf-8') as f:
            json.dump({'unicode': '数据'}, f)

        result = load_json_files_by_keyword(str(self.test_dir), '数据')
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0], {'unicode': '数据'})