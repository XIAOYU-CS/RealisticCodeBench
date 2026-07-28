import numpy as jnp


def n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim: int):
    """
        Generic N-dimensional linear interpolation function

        Parameters:
            x: Sampling point coordinates with shape (batch_size, dim)
            voxel_min: Minimum vertex coordinates of the voxel with shape (batch_size, dim)
            voxel_max: Maximum vertex coordinates of the voxel with shape (batch_size, dim)
            vertex_embeds: Voxel vertex features with shape (batch_size, 2^dim, num_features)
            dim: Interpolation dimension (>=1)

        Returns:
            Interpolation result with shape (batch_size, num_features)
    """
    voxel_size = voxel_max - voxel_min
    safe_size = jnp.where(voxel_size == 0, 1e-12, voxel_size)  # 避免除零
    weights = (x - voxel_min) / safe_size
    weights = jnp.clip(weights, 0.0, 1.0)  # 限制权重范围

    current_embeds = vertex_embeds

    for i in range(dim):
        group_size = current_embeds.shape[1] // 2
        group0 = current_embeds[:, :group_size, :]
        group1 = current_embeds[:, group_size:, :]
        w = weights[:, i, jnp.newaxis]
        current_embeds = group0 * (1 - w) + group1 * w

    return current_embeds.squeeze(1)


def quadrilinear_interp(x, voxel_min_vertex, voxel_max_vertex, voxel_embedds):
    """
        Quadrilinear interpolation function (4D linear interpolation)

        Parameters:
            x: Sampling point coordinates with shape (batch_size, 4)
            voxel_min_vertex: Minimum vertex coordinates of the voxel with shape (batch_size, 4)
            voxel_max_vertex: Maximum vertex coordinates of the voxel with shape (batch_size, 4)
            voxel_embedds: Voxel vertex features with shape (batch_size, 16, num_features)

        Returns:
            Interpolation result with shape (batch_size, num_features)
    """
    return n_linear_interp(
        x=x,
        voxel_min=voxel_min_vertex,
        voxel_max=voxel_max_vertex,
        vertex_embeds=voxel_embedds,
        dim=4
    )
