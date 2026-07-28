import unittest
import numpy as jnp


class TestNLinearInterp(unittest.TestCase):

    def test_2d_bilinear_interpolation(self):
        batch_size = 1
        dim = 2
        num_features = 1

        voxel_min = jnp.zeros((batch_size, dim))
        voxel_max = jnp.full((batch_size, dim), 2.0)

        x = jnp.ones((batch_size, dim))

        vertex_embeds = jnp.array([[[0.0], [2.0], [4.0], [6.0]]])

        expected = jnp.array([[3.0]])

        result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim)
        self.assertTrue(jnp.allclose(result, expected, atol=1e-6))

    def test_3d_trilinear_interpolation(self):
        batch_size = 1
        dim = 3
        num_features = 1

        voxel_min = jnp.zeros((batch_size, dim))
        voxel_max = jnp.full((batch_size, dim), 2.0)

        x = jnp.ones((batch_size, dim))

        vertex_embeds = jnp.arange(8, dtype=jnp.float32).reshape(1, 8, 1)

        expected = jnp.array([[3.5]])

        result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim)
        self.assertTrue(jnp.allclose(result, expected, atol=1e-6))

    def test_1d_linear_interpolation(self):
        batch_size = 1
        dim = 1
        num_features = 1

        voxel_min = jnp.zeros((batch_size, dim))
        voxel_max = jnp.full((batch_size, dim), 4.0)

        x = jnp.full((batch_size, dim), 2.0)

        vertex_embeds = jnp.array([[[2.0], [6.0]]])

        expected = jnp.array([[4.0]])

        result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim)
        self.assertTrue(jnp.allclose(result, expected, atol=1e-6))

    def test_interpolation_at_vertex(self):
        batch_size = 1
        dim = 2
        num_features = 1

        voxel_min = jnp.zeros((batch_size, dim))
        voxel_max = jnp.full((batch_size, dim), 1.0)

        x = jnp.full((batch_size, dim), 1.0)

        vertex_embeds = jnp.array([[[10.0], [20.0], [30.0], [40.0]]])

        expected = jnp.array([[40.0]])

        result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim)
        self.assertTrue(jnp.allclose(result, expected, atol=1e-6))

    def test_batch_multi_feature_interpolation(self):
        dim = 2

        voxel_min = jnp.array([[0.0, 0.0], [10.0, -2.0]])
        voxel_max = jnp.array([[2.0, 4.0], [14.0, 2.0]])
        x = jnp.array([[0.5, 1.0], [13.0, 1.0]])

        vertex_embeds = jnp.array([
            [[0.0, 0.0], [4.0, 8.0], [8.0, 16.0], [12.0, 24.0]],
            [[10.0, 100.0], [20.0, 200.0], [30.0, 300.0], [50.0, 500.0]],
        ])

        expected = jnp.array([[3.0, 6.0], [38.125, 381.25]])

        result = n_linear_interp(x, voxel_min, voxel_max, vertex_embeds, dim)
        self.assertTrue(jnp.allclose(result, expected, atol=1e-6))
