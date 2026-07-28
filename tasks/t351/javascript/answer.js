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
function parseRankRange(rankRange, step = 1) {
  const rankArray = [];

  // Input validation
  if (typeof rankRange !== 'string' || step <= 0) {
    return rankArray;
  }

  // Split and trim each part
  const rankElements = rankRange.split(',').map(el => el.trim());

  rankElements.forEach(rankElement => {
    // Match range format: start--end or start-end (both supported)
    const rangeMatch = rankElement.match(/^(-?\d+)-{1,2}(\d+)$/);
    if (rangeMatch) {
      const [, startStr, endStr] = rangeMatch;
      const start = Number(startStr);
      const end = Number(endStr);

      if (isNaN(start) || isNaN(end)) {
        return; // Skip invalid numbers
      }

      // Generate sequence based on direction and step
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
      // Try parsing as a single number
      const num = Number(rankElement);
      if (!isNaN(num)) {
        rankArray.push(num);
      }
      // Ignore invalid entries
    }
  });

  return rankArray;
}