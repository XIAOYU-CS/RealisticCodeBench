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
    # Triangle vertices
    v0 = triangles[:, 0]  # Shape: (num_triangles, 3)
    v1 = triangles[:, 1]  # Shape: (num_triangles, 3)
    v2 = triangles[:, 2]  # Shape: (num_triangles, 3)

    # Calculate triangle edges
    edge1 = v1 - v0  # Edge from v0 to v1
    edge2 = v2 - v0  # Edge from v0 to v2

    # Calculate cross product of ray direction and edge2
    h = np.cross(directions[:, np.newaxis, :], edge2)  # Shape: (num_rays, num_triangles, 3)

    # Calculate determinant
    a = np.sum(edge1 * h, axis=2)  # Shape: (num_rays, num_triangles)

    # Avoid division by zero and handle parallel ray-triangle cases
    eps = 1e-8
    mask = np.abs(a) > eps  # Valid determinants
    a_inv = np.zeros_like(a)
    a_inv[mask] = 1.0 / a[mask]

    # Calculate vector from vertex to ray origin
    s = origins[:, np.newaxis, :] - v0  # Shape: (num_rays, num_triangles, 3)

    # Calculate u parameter
    u = np.sum(s * h, axis=2) * a_inv  # Shape: (num_rays, num_triangles)

    # Check if u is within [0, 1] range
    u_valid = (u >= 0.0) & (u <= 1.0)

    # Calculate v parameter
    q = np.cross(s, edge1)  # Shape: (num_rays, num_triangles, 3)
    v = np.sum(directions[:, np.newaxis, :] * q, axis=2) * a_inv  # Shape: (num_rays, num_triangles)

    # Check if v is within [0, 1-u] range
    v_valid = (v >= 0.0) & (u + v <= 1.0)

    # Calculate t parameter (ray parameter)
    t = np.sum(edge2 * q, axis=2) * a_inv  # Shape: (num_rays, num_triangles)

    # Combine all valid conditions
    valid = mask & u_valid & v_valid & (t > eps)

    # Set non-intersecting distances to infinity
    t_valid = np.where(valid, t, np.inf)

    return valid, t_valid