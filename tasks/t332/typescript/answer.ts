/**
 * Compute QKV matrices for a sequence
 *
 * @param inputSeq - Input sequence, shape (seqLen, dModel)
 * @param W_Q - Query weight matrix, shape (dModel, dK * nHeads)
 * @param W_K - Key weight matrix, shape (dModel, dK * nHeads)
 * @param W_V - Value weight matrix, shape (dModel, dV * nHeads)
 * @param nHeads - Number of attention heads, default is 8
 * @returns Object containing Q, K, V matrices
 */
function computeQKV(
    inputSeq: number[][],
    W_Q: number[][],
    W_K: number[][],
    W_V: number[][],
    nHeads: number = 8
): { Q: number[][][]; K: number[][][]; V: number[][][] } {
    const seqLen: number = inputSeq.length;
    const dModel: number = inputSeq[0].length;
    const dK: number = Math.floor(W_Q[0].length / nHeads);
    const dV: number = Math.floor(W_V[0].length / nHeads);

    // Matrix multiplication function
    function matrixMultiply(A: number[][], B: number[][]): number[][] {
        const rowsA: number = A.length;
        const colsA: number = A[0].length;
        const colsB: number = B[0].length;
        const result: number[][] = Array(rowsA).fill(null).map(() => Array(colsB).fill(0));

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
    function reshape(arr: number[][], shape: [number, number, number]): number[][][] {
        const [seqLen, nHeads, d] = shape;
        const result: number[][][] = Array(seqLen).fill(null).map(() =>
            Array(nHeads).fill(null).map(() => Array(d).fill(0))
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
    const Q_flat: number[][] = matrixMultiply(inputSeq, W_Q);  // (seqLen, dK * nHeads)
    const K_flat: number[][] = matrixMultiply(inputSeq, W_K);  // (seqLen, dK * nHeads)
    const V_flat: number[][] = matrixMultiply(inputSeq, W_V);  // (seqLen, dV * nHeads)

    // Reshape to multi-head format
    const Q: number[][][] = reshape(Q_flat, [seqLen, nHeads, dK]);  // (seqLen, nHeads, dK)
    const K: number[][][] = reshape(K_flat, [seqLen, nHeads, dK]);  // (seqLen, nHeads, dK)
    const V: number[][][] = reshape(V_flat, [seqLen, nHeads, dV]);  // (seqLen, nHeads, dV)

    return { Q, K, V };
}