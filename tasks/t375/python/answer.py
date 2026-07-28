import numpy as np


class Frame:
    def __init__(self, num_keypoints):
        self.N = num_keypoints  # Number of keypoints
        self.mvuRight = [-1.0 for _ in range(num_keypoints)]  # Right view x-coordinates
        self.mvDepth = [-1.0 for _ in range(num_keypoints)]  # Depth values
        self.mvKeys = []  # Original keypoints
        self.mvKeysUn = []  # Undistorted keypoints
        self.mbf = 0.0  # Baseline * focal length (should be set appropriately)

    def compute_stereo_from_rgbd(self, im_depth):
        """
        Compute stereo information from RGBD depth image

        Args:
            im_depth: Input depth image (cv2 Mat)

        Raises:
            ValueError: If input depth image is empty or has unsupported type
        """
        if im_depth is None or im_depth.size == 0:
            raise ValueError("Input depth image is empty")

        if im_depth.dtype == np.float32:
            is_float = True
            is_ushort = False
        elif im_depth.dtype == np.uint16:
            is_float = False
            is_ushort = True
        else:
            raise ValueError(f"Unsupported depth image type: {im_depth.dtype}. Supported types: float32, uint16")

        depth_rows, depth_cols = im_depth.shape[:2]

        for i in range(self.N):
            kp = self.mvKeys[i]
            kp_u = self.mvKeysUn[i]

            u = kp.pt[0]
            v = kp.pt[1]

            u_int = int(round(u))
            v_int = int(round(v))

            if 0 <= u_int < depth_cols and 0 <= v_int < depth_rows:
                if is_float:
                    d = im_depth[v_int, u_int]
                else:
                    d = im_depth[v_int, u_int] / 1000.0

                if d > 0:
                    self.mvDepth[i] = d
                    self.mvuRight[i] = kp_u.pt[0] - (self.mbf / d)