package org.real.temp;

import java.util.*;

public class Answer {

    /**
     * Build a lookup table by processing position chunks to generate key-value mappings
     *
     * @param pos1Chunk Collection of position chunks, each containing a sequence of indices
     * @param initialValue Initial calculation value (originally A_initial)
     * @param flags Flag array that determines whether to use basis or inv_basis (originally d_l_msb_bits)
     * @param basis Array of basis elements (originally X_basis)
     * @param invBasis Array of inverse basis elements (originally X_inv_basis)
     * @param modulus Modulus value (originally n)
     * @return Map with calculation results as keys and position chunks as values
     * @throws IllegalArgumentException when input data is invalid or indices are out of range
     * @throws ClassCastException when input parameter types are incorrect
     */
    public static Map<Integer, List<Integer>> buildTableTask(
            List<List<Integer>> pos1Chunk,
            int initialValue,
            List<Integer> flags,
            List<Integer> basis,
            List<Integer> invBasis,
            int modulus) {

        // Validate input parameters
        if (pos1Chunk == null) {
            throw new IllegalArgumentException("pos1_chunk must be a list or tuple");
        }
        if (flags == null) {
            throw new IllegalArgumentException("flags must be a list or tuple");
        }
        if (basis == null) {
            throw new IllegalArgumentException("basis must be a list or tuple");
        }
        if (invBasis == null) {
            throw new IllegalArgumentException("inv_basis must be a list or tuple");
        }
        if (modulus <= 0) {
            throw new IllegalArgumentException("modulus must be a positive integer");
        }

        int maxValidIdx = Math.max(Math.max(flags.size(), basis.size()), invBasis.size()) - 1;
        if (maxValidIdx < 0) {
            throw new IllegalArgumentException("flags, basis, and inv_basis cannot all be empty");
        }

        Map<Integer, List<Integer>> tableChunk = new HashMap<>();

        for (List<Integer> pos1 : pos1Chunk) {
            // Validate indices
            for (Integer idx : pos1) {
                if (idx == null) {
                    throw new IllegalArgumentException("Indices must be integers, found null");
                }
                if (idx < 0 || idx > maxValidIdx) {
                    throw new IllegalArgumentException("Index " + idx + " is out of valid range [0, " + maxValidIdx + "]");
                }
            }

            // Calculate lhs value
            int lhs = initialValue;
            for (Integer idx : pos1) {
                if (flags.get(idx) == 1) {
                    lhs = (int) (((long) lhs * invBasis.get(idx)) % modulus);
                } else {
                    lhs = (int) (((long) lhs * basis.get(idx)) % modulus);
                }
            }

            tableChunk.put(lhs, new ArrayList<>(pos1));
        }

        return tableChunk;
    }
}
