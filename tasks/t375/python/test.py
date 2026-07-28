import unittest
from unittest.mock import Mock
import numpy as np

class TestFrameComputeStereoFromRGBD(unittest.TestCase):
    """Unit tests for the compute_stereo_from_rgbd method of the Frame class"""

    def setUp(self):
        """Initialize test data before each test method"""
        self.frame = Frame(num_keypoints=2)
        self.frame.mbf = 5000.0

        kp1 = Mock()
        kp1.pt = (100.0, 200.0)
        kp2 = Mock()
        kp2.pt = (300.0, 400.0)

        kp_un1 = Mock()
        kp_un1.pt = (105.0, 205.0)
        kp_un2 = Mock()
        kp_un2.pt = (305.0, 405.0)

        self.frame.mvKeys = [kp1, kp2]
        self.frame.mvKeysUn = [kp_un1, kp_un2]

    def test_valid_float32_depth_map(self):
        depth_map = np.ones((500, 500), dtype=np.float32) * 1000.0
        depth_map[200, 100] = 500.0
        depth_map[400, 300] = 250.0

        self.frame.compute_stereo_from_rgbd(depth_map)

        self.assertEqual(self.frame.mvDepth[0], 500.0)
        self.assertEqual(self.frame.mvuRight[0], 105.0 - (5000.0 / 500.0))  # 105 - 10 = 95
        self.assertEqual(self.frame.mvDepth[1], 250.0)
        self.assertEqual(self.frame.mvuRight[1], 305.0 - (5000.0 / 250.0))  # 305 - 20 = 285

    def test_valid_uint16_depth_map(self):
        depth_map = np.ones((500, 500), dtype=np.uint16) * 1000  # 1 meter
        depth_map[200, 100] = 500  # 500mm = 0.5m
        depth_map[400, 300] = 250  # 250mm = 0.25m

        self.frame.compute_stereo_from_rgbd(depth_map)

        self.assertEqual(self.frame.mvDepth[0], 0.5)
        self.assertEqual(self.frame.mvuRight[0], 105.0 - (5000.0 / 0.5))  # 105 - 10000 = -9895
        self.assertEqual(self.frame.mvDepth[1], 0.25)
        self.assertEqual(self.frame.mvuRight[1], 305.0 - (5000.0 / 0.25))  # 305 - 20000 = -19695

    def test_empty_depth_map(self):
        empty_map = None

        with self.assertRaises(ValueError) as context:
            self.frame.compute_stereo_from_rgbd(empty_map)

        self.assertEqual(str(context.exception), "Input depth image is empty")

    def test_unsupported_depth_type(self):
        invalid_map = np.ones((500, 500), dtype=np.uint8)

        with self.assertRaises(Exception) as context:
            self.frame.compute_stereo_from_rgbd(invalid_map)


    def test_keypoints_out_of_bounds(self):
        depth_map = np.ones((200, 200), dtype=np.float32) * 1000.0

        self.frame.compute_stereo_from_rgbd(depth_map)

        self.assertEqual(self.frame.mvDepth[0], -1.0)
        self.assertEqual(self.frame.mvuRight[0], -1.0)
        self.assertEqual(self.frame.mvDepth[1], -1.0)
        self.assertEqual(self.frame.mvuRight[1], -1.0)