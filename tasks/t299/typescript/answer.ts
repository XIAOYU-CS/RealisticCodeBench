/**
 * Check whether each row in data satisfies multiple XOR constraints.
 *
 * @param data - 2D array with shape (N, C)
 * @param xorGroups - Each subarray contains column indices to XOR
 * @param targetValues - Target XOR result for each group
 * @returns A boolean array indicating whether each row satisfies all XOR constraints
 */
function checkXorConstraints(
  data: number[][],
  xorGroups: number[][],
  targetValues: number[]
): boolean[] {
  const nRows = data.length;
  if (nRows === 0) return [];

  // Initialize results as all true
  let results: boolean[] = Array(nRows).fill(true);

  for (let i = 0; i < xorGroups.length; i++) {
    const group = xorGroups[i];
    const target = targetValues[i];

    if (group.length === 0) continue;

    // Compute XOR for each row in this group
    const xorResults: number[] = data.map(row => {
      let xor = row[group[0]];
      for (let j = 1; j < group.length; j++) {
        xor ^= row[group[j]];
      }
      return xor;
    });

    // Update results by checking against target
    results = results.map((res, idx) => res && xorResults[idx] === target);
  }

  return results;
}