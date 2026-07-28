function buildTableTask(
    pos1Chunk,
    initialValue,
    flags,
    basis,
    invBasis,
    modulus
) {
    /**
     * Build a lookup table by processing position chunks to generate key-value mappings
     *
     * @param {Array} pos1Chunk - Collection of position chunks, each containing a sequence of indices
     * @param {number} initialValue - Initial calculation value
     * @param {Array} flags - Flag array that determines whether to use basis or invBasis
     * @param {Array} basis - Array of basis elements
     * @param {Array} invBasis - Array of inverse basis elements
     * @param {number} modulus - Modulus value
     *
     * @returns {Object} Lookup table with calculation results as keys and position chunks as values
     *
     * @throws {TypeError} When input parameter types are incorrect
     * @throws {RangeError} When input data is invalid or indices are out of range
     */

    if (!Array.isArray(pos1Chunk)) {
        throw new TypeError("pos1Chunk must be an array");
    }
    if (!pos1Chunk.every(chunk => Array.isArray(chunk))) {
        throw new TypeError("Elements in pos1Chunk must be arrays");
    }
    if (!Array.isArray(flags)) {
        throw new TypeError("flags must be an array");
    }
    if (!Array.isArray(basis)) {
        throw new TypeError("basis must be an array");
    }
    if (!Array.isArray(invBasis)) {
        throw new TypeError("invBasis must be an array");
    }
    if (!Number.isInteger(modulus) || modulus <= 0) {
        throw new RangeError("modulus must be a positive integer");
    }

    const maxValidIdx = Math.max(flags.length, basis.length, invBasis.length) - 1;
    if (maxValidIdx < 0) {
        throw new RangeError("flags, basis, and invBasis cannot all be empty");
    }

    const tableChunk = {};
    for (const pos1 of pos1Chunk) {
        for (const idx of pos1) {
            if (!Number.isInteger(idx)) {
                throw new TypeError(`Indices must be integers, found ${typeof idx}`);
            }
            if (idx < 0 || idx > maxValidIdx) {
                throw new RangeError(`Index ${idx} is out of valid range [0, ${maxValidIdx}]`);
            }
        }

        let lhs = initialValue;
        for (const idx of pos1) {
            if (flags[idx] === 1) {
                lhs = (lhs * invBasis[idx]) % modulus;
            } else {
                lhs = (lhs * basis[idx]) % modulus;
            }
        }

        tableChunk[lhs] = pos1;
    }

    return tableChunk;
}