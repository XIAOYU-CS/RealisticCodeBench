import numpy as np


def compute_qkv(input_seq, W_Q, W_K, W_V, n_heads=8):
    """
    Compute QKV matrices for a sequence

    Args:
        input_seq: Input sequence, shape (seq_len, d_model)
        W_Q: Query weight matrix, shape (d_model, d_k * n_heads)
        W_K: Key weight matrix, shape (d_model, d_k * n_heads)
        W_V: Value weight matrix, shape (d_model, d_v * n_heads)
        n_heads: Number of attention heads, default is 8

    Returns:
        Q: Query matrix, shape (seq_len, n_heads, d_k)
        K: Key matrix, shape (seq_len, n_heads, d_k)
        V: Value matrix, shape (seq_len, n_heads, d_v)
    """