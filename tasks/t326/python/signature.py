import numpy as np


def moller_trumbore_numpy(origins: np.ndarray, directions: np.ndarray, triangles: np.ndarray) -> tuple[
    np.ndarray, np.ndarray]:
    """Möller-Trumbore algorithm implementation for ray-triangle intersection detection.

    This function uses the Möller-Trumbore algorithm to efficiently compute intersections
    between multiple rays and multiple triangles. The algorithm uses barycentric coordinates
    to determine if and where rays intersect with triangles.

    Args:
        origins: Array of ray origins with shape (num_rays, 3) where each row represents
            a 3D point [x, y, z].
        directions: Array of ray directions with shape (num_rays, 3) where each row
            represents a 3D direction vector [dx, dy, dz]. Vectors should be normalized
            for accurate distance calculations.
        triangles: Array of triangles with shape (num_triangles, 3, 3) where each
            triangle is defined by three 3D vertices [v0, v1, v2], and each vertex
            is [x, y, z].

    Returns:
        tuple: A tuple containing:
            - valid (np.ndarray): Boolean array with shape (num_rays, num_triangles)
              indicating whether each ray intersects each triangle.
            - distances (np.ndarray): Distance array with shape (num_rays, num_triangles)
              containing the distance from ray origin to intersection point. Non-intersecting
              rays have infinite distance values.
    """