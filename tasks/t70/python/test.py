import os
import shutil
import tempfile
import unittest


class TestExtractTextFromPDF(unittest.TestCase):
    def fixture_path(self, name):
        return os.path.join(os.getcwd(), "test_case", "t249", name)

    def test_empty_file(self):
        pdf_path = r"E:\code\code_back\python_project\RealisticEval-Data\envs\python\test_case\t249\testcase01.pdf"
        expected = " \n"
        output = extract_text_from_pdf(pdf_path)
        self.assertEqual(output, expected)

    def test_normal_file(self):
        pdf_path = r"E:\code\code_back\python_project\RealisticEval-Data\envs\python\test_case\t249\testcase02.pdf"
        expected = "11111  \n"
        output = extract_text_from_pdf(pdf_path)
        self.assertEqual(output, expected)

    def test_more_text_file(self):
        pdf_path = r"E:\code\code_back\python_project\RealisticEval-Data\envs\python\test_case\t249\testcase03.pdf"
        expected = "11111  \n22222  \n33333  \n44444  \n"
        output = extract_text_from_pdf(pdf_path)
        self.assertEqual(output, expected)

    def test_file_path_with_spaces(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            pdf_path = os.path.join(temp_dir, "fixture with spaces.pdf")
            shutil.copyfile(self.fixture_path("testcase02.pdf"), pdf_path)
            self.assertEqual(extract_text_from_pdf(pdf_path), "11111  \n")

    def test_missing_file_raises(self):
        with self.assertRaises(FileNotFoundError):
            extract_text_from_pdf(self.fixture_path("missing.pdf"))
