import unittest


class Tester(unittest.TestCase):
    def test_empty_input(self):
        input_data = bytearray([])
        self.assertEqual(base64_encode(input_data), "")
    
    def test_encode_hello(self):
        input_data = bytearray([ord('h'), ord('e'), ord('l'), ord('l'), ord('o')])
        self.assertEqual(base64_encode(input_data), "aGVsbG8=")
    
    def test_encode_world(self):
        input_data = bytearray([ord('w'), ord('o'), ord('r'), ord('l'), ord('d')])
        self.assertEqual(base64_encode(input_data), "d29ybGQ=")

    def test_encode_foobar(self):
        input_data = bytearray([ord('f'), ord('o'), ord('o'), ord('b'), ord('a'), ord('r')])
        self.assertEqual(base64_encode(input_data), "Zm9vYmFy")

    def test_encode_catch2(self):
        input_data = bytearray([ord('C'), ord('a'), ord('t'), ord('c'), ord('h'), ord('2')])
        self.assertEqual(base64_encode(input_data), "Q2F0Y2gy")
    
    def test_encode_single_byte(self):
        input_data = bytearray([ord('A')])
        self.assertEqual(base64_encode(input_data), "QQ==")
