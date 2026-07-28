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