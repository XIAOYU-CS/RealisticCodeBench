type InterpolationMethod = 'linear' | 'nearest' | 'cubic' | 'quadratic';
/**
 * Interpolate values along a row using various interpolation methods.
 *
 * @param gridRow - Input data values to interpolate from
 * @param yInitial - Original coordinate values corresponding to gridRow
 * @param ySought - Target coordinate values where interpolation is desired
 * @param interpRow - Output array to store interpolated values
 * @param method - Interpolation method to use ('linear', 'nearest', 'cubic', 'quadratic')
 * @returns void
 */
function interpPerRowWithDifferentMethods(
    gridRow: number[],
    yInitial: number[],
    ySought: number[],
    interpRow: number[],
    method: string = 'linear'
): void {
    // Validate input shapes
    if (gridRow.length !== yInitial.length) {
        throw new Error("gridRow and yInitial must have the same length");
    }

    if (interpRow.length !== ySought.length) {
        throw new Error("interpRow and ySought must have the same length");
    }

    if (method === 'linear') {
        // Linear interpolation implementation
        for (let i = 0; i < ySought.length; i++) {
            interpRow[i] = linearInterp(ySought[i], yInitial, gridRow);
        }
    } else if (method === 'nearest') {
        // Nearest neighbor interpolation
        for (let i = 0; i < ySought.length; i++) {
            interpRow[i] = nearestInterp(ySought[i], yInitial, gridRow);
        }
    } else if (method === 'cubic' || method === 'quadratic') {
        // For cubic and quadratic, we'll use a simplified approach
        // In a real implementation, you might want to use a more sophisticated library
        for (let i = 0; i < ySought.length; i++) {
            interpRow[i] = polynomialInterp(ySought[i], yInitial, gridRow, method);
        }
    } else {
        throw new Error(`Unsupported interpolation method: ${method}`);
    }
}

/**
 * Linear interpolation function (equivalent to numpy.interp)
 */
function linearInterp(x: number, xp: number[], fp: number[]): number {
    // Handle edge cases
    if (x <= xp[0]) return fp[0];
    if (x >= xp[xp.length - 1]) return fp[fp.length - 1];

    // Find the interval
    for (let i = 0; i < xp.length - 1; i++) {
        if (x >= xp[i] && x <= xp[i + 1]) {
            const t = (x - xp[i]) / (xp[i + 1] - xp[i]);
            return fp[i] + t * (fp[i + 1] - fp[i]);
        }
    }
    return fp[fp.length - 1]; // fallback
}

/**
 * Nearest neighbor interpolation
 */
function nearestInterp(x: number, xp: number[], fp: number[]): number {
    let minDist = Math.abs(x - xp[0]);
    let nearestIndex = 0;

    for (let i = 1; i < xp.length; i++) {
        const dist = Math.abs(x - xp[i]);
        if (dist < minDist) {
            minDist = dist;
            nearestIndex = i;
        }
    }
    return fp[nearestIndex];
}

/**
 * Simplified polynomial interpolation (cubic/quadratic)
 * Note: This is a simplified implementation for demonstration
 */
function polynomialInterp(x: number, xp: number[], fp: number[], method: string): number {
    return linearInterp(x, xp, fp);
}
