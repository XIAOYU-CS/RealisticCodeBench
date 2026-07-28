/**
 * Parses a string representing a list of ranks or rank ranges into an array of numbers.
 *
 * The input string can contain:
 * - Single integers: "1, 2, 3"
 * - Ranges separated by double hyphen "--" or single hyphen "-": "1--5", "10-5"
 * - Mixed format: "1, 3--7, 10"
 *
 * A step value controls the increment/decrement within ranges.
 * Only integers (or values convertible to integers) are supported.
 *
 * @param {string} rankRange - The string containing ranks and/or ranges.
 * @param {number} [step=1] - The increment step for ranges (must be positive).
 * @returns {number[]} - An array of parsed integers in order.
 */
function parseRankRange(rankRange: string, step: number = 1): number[] {
  const rankArray: number[] = [];

  // Input validation
  if (typeof rankRange !== 'string' || step <= 0 || !isFinite(step)) {
    return rankArray;
  }

  // Normalize range separators: convert "a - b" or "a--b" to "a--b"
  const normalized = rankRange
    .replace(/\s*-\s*-\s*/g, '--') // handle spaced double hyphen
    .replace(/\s*-\s*/g, '-');     // handle spaced single hyphen

  const rankElements = normalized.split(',').map(el => el.trim());

  for (const rankElement of rankElements) {
    if (!rankElement) continue; // skip empty

    // Match range: start--end or start-end
    const rangeMatch = rankElement.match(/^(-?\d+)-{1,2}(\d+)$/);
    if (rangeMatch) {
      const [, startStr, endStr] = rangeMatch;
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (isNaN(start) || isNaN(end)) {
        continue; // skip invalid
      }

      if (start <= end) {
        for (let i = start; i <= end; i += step) {
          rankArray.push(i);
        }
      } else {
        for (let i = start; i >= end; i -= step) {
          rankArray.push(i);
        }
      }
    } else {
      // Try as single number
      const num = parseInt(rankElement, 10);
      if (!isNaN(num)) {
        rankArray.push(num);
      }
      // Ignore invalid entries
    }
  }

  return rankArray;
}