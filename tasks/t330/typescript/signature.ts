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
): void {}