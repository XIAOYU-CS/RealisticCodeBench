/**
 * Compute QKV matrices for a sequence
 *
 * @param {Array<Array<number>>} inputSeq - Input sequence, shape (seqLen, dModel)
 * @param {Array<Array<number>>} W_Q - Query weight matrix, shape (dModel, dK * nHeads)
 * @param {Array<Array<number>>} W_K - Key weight matrix, shape (dModel, dK * nHeads)
 * @param {Array<Array<number>>} W_V - Value weight matrix, shape (dModel, dV * nHeads)
 * @param {number} nHeads - Number of attention heads, default is 8
 * @returns {Object} Object containing Q, K, V matrices
 */
function computeQKV(inputSeq, W_Q, W_K, W_V, nHeads = 8) {
    const seqLen = inputSeq.length;
    const dModel = inputSeq[0].length;
    const dK = Math.floor(W_Q[0].length / nHeads);
    const dV = Math.floor(W_V[0].length / nHeads);

    // Matrix multiplication function
    function matrixMultiply(A, B) {
        const rowsA = A.length;
        const colsA = A[0].length;
        const colsB = B[0].length;
        const result = Array(rowsA).fill().map(() => Array(colsB).fill(0));

        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    }

    // Reshape function for multi-head attention
    function reshape(arr, shape) {
        const [seqLen, nHeads, d] = shape;
        const result = Array(seqLen).fill().map(() =>
            Array(nHeads).fill().map(() => Array(d).fill(0))
        );

        for (let i = 0; i < seqLen; i++) {
            for (let h = 0; h < nHeads; h++) {
                for (let dIdx = 0; dIdx < d; dIdx++) {
                    result[i][h][dIdx] = arr[i][h * d + dIdx];
                }
            }
        }
        return result;
    }

    // Compute Q, K, V through matrix multiplication
    const Q_flat = matrixMultiply(inputSeq, W_Q);  // (seqLen, dK * nHeads)
    const K_flat = matrixMultiply(inputSeq, W_K);  // (seqLen, dK * nHeads)
    const V_flat = matrixMultiply(inputSeq, W_V);  // (seqLen, dV * nHeads)

    // Reshape to multi-head format
    const Q = reshape(Q_flat, [seqLen, nHeads, dK]);  // (seqLen, nHeads, dK)
    const K = reshape(K_flat, [seqLen, nHeads, dK]);  // (seqLen, nHeads, dK)
    const V = reshape(V_flat, [seqLen, nHeads, dV]);  // (seqLen, nHeads, dV)

    return { Q, K, V };
}