/**
 * Builds a lookup table by processing position chunks to generate key-value mappings.
 *
 * @param pos1Chunk - Collection of position chunks, each containing a sequence of indices
 * @param initialValue - Initial calculation value
 * @param flags - Flag array that determines whether to use basis or invBasis
 * @param basis - Array of basis elements
 * @param invBasis - Array of inverse basis elements
 * @param modulus - Modulus value (must be a positive integer)
 * @returns Lookup table with calculation results as keys and position chunks as values
 * @throws {TypeError} When input parameter types are incorrect
 * @throws {RangeError} When input data is invalid or indices are out of range
 */
export function buildTableTask(
    pos1Chunk: number[][],
    initialValue: number,
    flags: number[],
    basis: number[],
    invBasis: number[],
    modulus: number
): Record<number, number[]> {
    if (!Array.isArray(pos1Chunk) || !pos1Chunk.every(
        chunk => Array.isArray(chunk) && chunk.every(Number.isInteger)
    )) {
        throw new TypeError('pos1Chunk must be an array of arrays containing integers');
    }

    if (!Array.isArray(flags) || !flags.every(Number.isInteger)) {
        throw new TypeError('flags must be an array of integers');
    }

    if (!Array.isArray(basis) || !basis.every(n => typeof n === 'number')) {
        throw new TypeError('basis must be an array of numbers');
    }

    if (!Array.isArray(invBasis) || !invBasis.every(n => typeof n === 'number')) {
        throw new TypeError('invBasis must be an array of numbers');
    }

    if (!Number.isInteger(modulus) || modulus <= 0) {
        throw new RangeError('modulus must be a positive integer');
    }

    const maxValidIndex = Math.max(flags.length, basis.length, invBasis.length) - 1;
    if (maxValidIndex < 0) {
        throw new RangeError('flags, basis, and invBasis cannot all be empty');
    }

    const tableChunk: Record<number, number[]> = {};

    for (const pos1 of pos1Chunk) {
        for (const index of pos1) {
            if (index < 0 || index > maxValidIndex) {
                throw new RangeError(
                    `Index ${index} is out of valid range [0, ${maxValidIndex}]`
                );
            }
        }

        let lhs = initialValue;
        for (const index of pos1) {
            if (flags[index] === 1) {
                lhs = (lhs * invBasis[index]) % modulus;
            } else {
                lhs = (lhs * basis[index]) % modulus;
            }
        }

        tableChunk[lhs] = pos1;
    }

    return tableChunk;
}