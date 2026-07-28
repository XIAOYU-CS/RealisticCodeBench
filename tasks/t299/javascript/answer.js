/**
 * Check whether each row in data satisfies multiple XOR constraints.
 *
 * @param {number[][]} data - 2D array with shape (N, C)
 * @param {number[][]} xorGroups - Each subarray contains column indices to XOR
 * @param {number[]} targetValues - Target XOR result for each group
 * @returns {boolean[]} A boolean list indicating whether each row satisfies all XOR constraints
 */
function checkXorConstraints(data, xorGroups, targetValues) {
    const nRows = data.length;
    if (nRows === 0) return [];
    let results = Array(nRows).fill(true);
    for (let i = 0; i < xorGroups.length; i++) {
        const group = xorGroups[i];
        const target = targetValues[i];
        if (group.length === 0) continue;
        const xorResults = data.map(row => {
            let xor = row[group[0]];
            for (let j = 1; j < group.length; j++) {
                xor ^= row[group[j]];
            }
            return xor;
        });
        results = results.map((res, idx) => res && (xorResults[idx] === target));
    }
    return results;
}