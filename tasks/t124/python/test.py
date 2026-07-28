import unittest


class TestExtractDateFromFilename(unittest.TestCase):

    def test_yyyy_mm_dd_format(self):
        self.assertEqual(extract_date_from_filename("report_2023-12-31.pdf"), "2023-12-31")
        self.assertEqual(extract_date_from_filename("data_2023-01-01_backup.txt"), "2023-01-01")
        self.assertIsNone(extract_date_from_filename("2023-02-29-invalid.txt"))

    def test_yyyymmdd_format(self):
        self.assertEqual(extract_date_from_filename("backup_20231231.zip"), "20231231")
        self.assertEqual(extract_date_from_filename("20230101_initial.sql"), "20230101")
        self.assertIsNone(extract_date_from_filename("file_20230229.dat"))

    def test_dd_mm_yyyy_and_mm_dd_yyyy_formats(self):
        self.assertEqual(extract_date_from_filename("data_31-12-2023.csv"), "31-12-2023")
        self.assertEqual(extract_date_from_filename("log_12-31-2023.txt"), "12-31-2023")
        self.assertIsNone(extract_date_from_filename("invalid_32-13-2023.doc"))

    def test_dd_mm_yyyy_and_mm_dd_yyyy_slash_formats(self):
        self.assertEqual(extract_date_from_filename("report_31/12/2023.pdf"), "31/12/2023")
        self.assertEqual(extract_date_from_filename("log_12/31/2023.txt"), "12/31/2023")
        self.assertIsNone(extract_date_from_filename("error_31/13/2023.log"))

    def test_no_valid_date_found(self):
        self.assertIsNone(extract_date_from_filename("no_date_here.txt"))
        self.assertIsNone(extract_date_from_filename("random_123456789_string.doc"))
        self.assertIsNone(extract_date_from_filename("invalid_99-99-9999.txt"))
        self.assertIsNone(extract_date_from_filename("almost_2023-13-01_close.txt"))