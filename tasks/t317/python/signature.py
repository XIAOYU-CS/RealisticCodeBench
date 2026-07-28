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