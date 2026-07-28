import unittest
class TestDetectPhoneNumbers(unittest.TestCase):


    def test_chinese_mobile_numbers(self):
        text = "我的手机号是13812345678，办公室电话是+8613987654321"
        result = detect_phone_numbers(text, region="cn")

        self.assertEqual(len(result), 2)
        cn_mobile_numbers = [item for item in result if item["type"] == "cn_mobile"]
        self.assertEqual(len(cn_mobile_numbers), 2)

    def test_us_phone_numbers(self):
        text = "Contact us at +1 (555) 123-4567 or +1-555-123-4568"
        result = detect_phone_numbers(text, region="us")

        self.assertEqual(len(result), 2)
        for item in result:
            self.assertEqual(item["type"], "international")
            self.assertTrue(item["number"].startswith("+1"))

    def test_custom_pattern(self):
        text = "Emergency: 911, Info: 411, Service: 311"
        custom_pattern = r"\b(911|411|311)\b"
        result = detect_phone_numbers(text, custom_pattern=custom_pattern)

        self.assertEqual(len(result), 3)
        numbers = [item["number"] for item in result]
        self.assertIn("911", numbers)
        self.assertIn("411", numbers)
        self.assertIn("311", numbers)

    def test_default_region_detects_global_number(self):
        text = "Reach the London desk at +44 207 123 4567."
        result = detect_phone_numbers(text)

        self.assertEqual(result, [{"number": "+44 207 123 4567", "type": "international"}])

    def test_no_phone_numbers(self):
        text = "This text contains no phone numbers at all."
        result = detect_phone_numbers(text, region="global")

        self.assertEqual(len(result), 0)
        self.assertIsInstance(result, list)
        self.assertEqual(result, [])
