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
    seq_len, d_model = input_seq.shape
    d_k = W_Q.shape[1] // n_heads
    d_v = W_V.shape[1] // n_heads

    # Compute Q, K, V through matrix multiplication
    Q = np.dot(input_seq, W_Q)  # (seq_len, d_k * n_heads)
    K = np.dot(input_seq, W_K)  # (seq_len, d_k * n_heads)
    V = np.dot(input_seq, W_V)  # (seq_len, d_v * n_heads)

    # Reshape to multi-head format
    Q = Q.reshape(seq_len, n_heads, d_k)  # (seq_len, n_heads, d_k)
    K = K.reshape(seq_len, n_heads, d_k)  # (seq_len, n_heads, d_k)
    V = V.reshape(seq_len, n_heads, d_v)  # (seq_len, n_heads, d_v)

    return Q, K, V