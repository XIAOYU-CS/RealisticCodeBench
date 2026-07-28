import numpy as np


def moller_trumbore_numpy(ray_origins:np.ndarray, ray_directions:np.ndarray, triangles:np.ndarray):
    """
    Computes the intersections between rays and triangles using the Moller-Trumbore algorithm with NumPy.

    Args:
        ray_origins (ndarray): A numpy array of shape (N, 3) containing the origins of N rays.
        ray_directions (ndarray): A numpy array of shape (N, 3) containing the normalized direction vectors of N rays.
        triangles (ndarray): A numpy array of shape (M, 3, 3) containing M triangles defined by their vertices.

    Returns:
        valid_intersections (ndarray): A boolean array of shape (N, M) indicating if a ray intersects a triangle.
        t (ndarray): A numpy array of shape (N, M) containing the distance from the ray origin to the intersection point.
    """
    EPSILON = 1e-6  # Small constant to avoid division by zero and floating point errors

    N = ray_origins.shape[0]  # Number of rays
    M = triangles.shape[0]  # Number of triangles

    edge1 = triangles[:, 1] - triangles[:, 0]
    edge2 = triangles[:, 2] - triangles[:, 0]

    edge1 = edge1.reshape(1, M, 3)
    edge2 = edge2.reshape(1, M, 3)

    ray_dirs = ray_directions.reshape(N, 1, 3)

    h = np.cross(ray_dirs, edge2)

    a = np.sum(edge1 * h, axis=2)

    mask = np.abs(a) > EPSILON

    f = np.where(mask, 1.0 / a, 0.0)

    s = ray_origins.reshape(N, 1, 3) - triangles[:, 0].reshape(1, M, 3)

    u = f * np.sum(s * h, axis=2)

    q = np.cross(s, edge1)

    v = f * np.sum(ray_dirs * q, axis=2)
    t = f * np.sum(edge2 * q, axis=2)

    valid_intersections = (
            (u >= 0.0) &
            (u <= 1.0) &
            (v >= 0.0) &
            ((u + v) <= 1.0) &
            (t > EPSILON) &
            mask  # Ensure we only consider valid triangles (non-zero determinant)
    )

    return valid_intersections, t