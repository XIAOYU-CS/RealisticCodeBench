import unittest


class TestParseMarkdownTable(unittest.TestCase):
    def test_standard_table(self):
        md_table = """
        | Header 1 | Header 2 | Header 3 |
        |----------|----------|----------|
        | Row1Col1 | Row1Col2 | Row1Col3 |
        | Row2Col1 | Row2Col2 | Row2Col3 |
        """
        expected = [
            ('Header 1', 'Header 2', 'Header 3'),
            ('Row1Col1', 'Row1Col2', 'Row1Col3'),
            ('Row2Col1', 'Row2Col2', 'Row2Col3')
        ]
        result = parse_markdown_table(md_table)
        self.assertEqual(result, expected)

    def test_inconsistent_columns(self):
        md_table = """
        | Header 1 | Header 2 |
        |----------|----------|
        | Row1     | Row1Col2 | ExtraCol |
        | Row2     |
        """
        expected = [
            ('Header 1', 'Header 2'),
            ('Row1', 'Row1Col2', 'ExtraCol'),
            ('Row2',)
        ]
        result = parse_markdown_table(md_table)
        self.assertEqual(result, expected)

    def test_empty_cells(self):
        md_table = """
        | Header 1 | Header 2 | Header 3 |
        |----------|----------|----------|
        |          | Row1Col2 |          |
        | Row2Col1 |          | Row2Col3 |
        """
        expected = [
            ('Header 1', 'Header 2', 'Header 3'),
            ('', 'Row1Col2', ''),
            ('Row2Col1', '', 'Row2Col3')
        ]
        result = parse_markdown_table(md_table)
        self.assertEqual(result, expected)

    def test_all_empty_rows(self):
        md_table = """
        | Header 1 | Header 2 | Header 3 |
        |----------|----------|----------|
        |          |          |          |
        |          |          |          |
        """
        expected = [
            ('Header 1', 'Header 2', 'Header 3'),
            ('', '', ''),
            ('', '', '')
        ]
        result = parse_markdown_table(md_table)
        self.assertEqual(result, expected)

    def test_excessive_whitespace(self):
        md_table = """
        |  Header 1  |  Header 2  |  Header 3  |
        |------------|------------|------------|
        |  Row1Col1  |  Row1Col2  |  Row1Col3  |
        |  Row2Col1  |  Row2Col2  |  Row2Col3  |
        """
        expected = [
            ('Header 1', 'Header 2', 'Header 3'),
            ('Row1Col1', 'Row1Col2', 'Row1Col3'),
            ('Row2Col1', 'Row2Col2', 'Row2Col3')
        ]
        result = parse_markdown_table(md_table)
        self.assertEqual(result, expected)
