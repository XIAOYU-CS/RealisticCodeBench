import unittest


class TestFormatThreadCount(unittest.TestCase):

    def test_basic_functionality(self):
        self.assertEqual(thread_count_to_formatted_string(1), "1 Thread")
        self.assertEqual(thread_count_to_formatted_string(5), "5 Threads")
        self.assertEqual(thread_count_to_formatted_string(0), "No Threads")

    def test_zero_padding(self):
        self.assertEqual(thread_count_to_formatted_string(5, use_zero_pad=True), "05 Threads")
        self.assertEqual(thread_count_to_formatted_string(5, padding=3, use_zero_pad=True), "005 Threads")
        self.assertEqual(thread_count_to_formatted_string(5, use_zero_pad=False), "5 Threads")

    def test_thousands_separator(self):
        self.assertEqual(thread_count_to_formatted_string(1000, use_thousands_sep=True), "1,000 Threads")
        result = thread_count_to_formatted_string(1000, use_zero_pad=True, use_thousands_sep=True)
        self.assertEqual(result, "1,000 Threads")

    def test_custom_text(self):
        self.assertEqual(thread_count_to_formatted_string(0, zero_str="Zero Threads"), "Zero Threads")
        self.assertEqual(thread_count_to_formatted_string(1, singular="Proceso", plural="Procesos"), "1 Proceso")
        self.assertEqual(thread_count_to_formatted_string(3, singular="Proceso", plural="Procesos"), "3 Procesos")

    def test_error_handling(self):
        with self.assertRaises(Exception) as context:
            thread_count_to_formatted_string(-1)

        # Test invalid type
        with self.assertRaises(Exception) as context:
            thread_count_to_formatted_string("invalid")

        # Test None input
        with self.assertRaises(Exception) as context:
            thread_count_to_formatted_string(None)
