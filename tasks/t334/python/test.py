import unittest


class TestOpcDataToPixels(unittest.TestCase):

    def test_rgb_format(self):
        data = bytes([255, 0, 0, 0, 255, 0])
        result = opc_data_to_pixels(data, format='rgb')
        self.assertEqual(result, [(255, 0, 0), (0, 255, 0)])

    def test_rgba_format(self):
        data = bytes([0, 0, 255, 128])
        result = opc_data_to_pixels(data, format='rgba')
        self.assertEqual(result, [(0, 0, 255, 128)])

    def test_grb_format(self):
        data = bytes([0, 255, 0])
        result = opc_data_to_pixels(data, format='grb')
        self.assertEqual(result, [(255, 0, 0)])

    def test_bgr_format(self):
        data = bytes([0, 0, 255])
        result = opc_data_to_pixels(data, format='bgr')
        self.assertEqual(result, [(255, 0, 0)])

    def test_normalize_parameter(self):
        data = bytes([255, 128, 0])
        result = opc_data_to_pixels(data, format='rgb', normalize=True)
        self.assertAlmostEqual(result[0][0], 1.0, places=5)
        self.assertAlmostEqual(result[0][1], 128 / 255, places=5)
        self.assertAlmostEqual(result[0][2], 0.0, places=5)