import unittest
import numpy as np
class TestComputeQKV(unittest.TestCase):

    def test_basic_computation(self):
        np.random.seed(42)

        seq_len, d_model, d_k, d_v, n_heads = 3, 4, 2, 2, 2

        input_seq = np.random.randn(seq_len, d_model)
        W_Q = np.random.randn(d_model, d_k * n_heads)
        W_K = np.random.randn(d_model, d_k * n_heads)
        W_V = np.random.randn(d_model, d_v * n_heads)

        Q, K, V = compute_qkv(input_seq, W_Q, W_K, W_V, n_heads)

        self.assertEqual(Q.shape, (seq_len, n_heads, d_k))
        self.assertEqual(K.shape, (seq_len, n_heads, d_k))
        self.assertEqual(V.shape, (seq_len, n_heads, d_v))

        self.assertEqual(Q.dtype, np.float64)
        self.assertEqual(K.dtype, np.float64)
        self.assertEqual(V.dtype, np.float64)

    def test_single_head(self):
        np.random.seed(123)

        seq_len, d_model, d_k, d_v = 2, 3, 1, 1
        n_heads = 1

        input_seq = np.array([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
        W_Q = np.random.randn(d_model, d_k * n_heads)
        W_K = np.random.randn(d_model, d_k * n_heads)
        W_V = np.random.randn(d_model, d_v * n_heads)

        Q, K, V = compute_qkv(input_seq, W_Q, W_K, W_V, n_heads)

        self.assertEqual(Q.shape, (seq_len, n_heads, d_k))
        self.assertEqual(K.shape, (seq_len, n_heads, d_k))
        self.assertEqual(V.shape, (seq_len, n_heads, d_v))

        expected_Q = np.dot(input_seq, W_Q).reshape(seq_len, n_heads, d_k)
        np.testing.assert_array_almost_equal(Q, expected_Q)

    def test_large_dimensions(self):
        np.random.seed(456)

        seq_len, d_model, d_k, d_v, n_heads = 10, 128, 64, 64, 8

        input_seq = np.random.randn(seq_len, d_model)
        W_Q = np.random.randn(d_model, d_k * n_heads) * 0.1
        W_K = np.random.randn(d_model, d_k * n_heads) * 0.1
        W_V = np.random.randn(d_model, d_v * n_heads) * 0.1

        Q, K, V = compute_qkv(input_seq, W_Q, W_K, W_V, n_heads)

        self.assertEqual(Q.shape, (seq_len, n_heads, d_k))
        self.assertEqual(K.shape, (seq_len, n_heads, d_k))
        self.assertEqual(V.shape, (seq_len, n_heads, d_v))

        self.assertTrue(np.all(np.isfinite(Q)))
        self.assertTrue(np.all(np.isfinite(K)))
        self.assertTrue(np.all(np.isfinite(V)))

    def test_zero_input(self):
        seq_len, d_model, d_k, d_v, n_heads = 4, 5, 3, 3, 2

        input_seq = np.zeros((seq_len, d_model))
        W_Q = np.random.randn(d_model, d_k * n_heads)
        W_K = np.random.randn(d_model, d_k * n_heads)
        W_V = np.random.randn(d_model, d_v * n_heads)

        Q, K, V = compute_qkv(input_seq, W_Q, W_K, W_V, n_heads)

        np.testing.assert_array_almost_equal(Q, np.zeros((seq_len, n_heads, d_k)))
        np.testing.assert_array_almost_equal(K, np.zeros((seq_len, n_heads, d_k)))
        np.testing.assert_array_almost_equal(V, np.zeros((seq_len, n_heads, d_v)))

    def test_identity_weights(self):
        seq_len, d_model, d_k, d_v, n_heads = 2, 4, 2, 2, 2

        input_seq = np.array([
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0]
        ])

        W_Q = np.zeros((d_model, d_k * n_heads))
        W_K = np.zeros((d_model, d_k * n_heads))
        W_V = np.zeros((d_model, d_v * n_heads))

        W_Q[0, 0] = 1.0  
        W_Q[1, 1] = 2.0  
        W_K[0, 0] = 0.5
        W_K[1, 1] = 1.5
        W_V[0, 0] = 3.0
        W_V[1, 1] = 4.0

        Q, K, V = compute_qkv(input_seq, W_Q, W_K, W_V, n_heads)

        self.assertAlmostEqual(Q[0, 0, 0], 1.0)
        self.assertAlmostEqual(Q[1, 0, 1], 2.0)
        self.assertAlmostEqual(K[0, 0, 0], 0.5)
        self.assertAlmostEqual(K[1, 0, 1], 1.5)
        self.assertAlmostEqual(V[0, 0, 0], 3.0)
        self.assertAlmostEqual(V[1, 0, 1], 4.0)