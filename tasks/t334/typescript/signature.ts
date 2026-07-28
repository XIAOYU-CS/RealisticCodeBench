/**
 * Converts raw OPC data to a list of pixel color tuples
 *
 * @param data - Raw byte data
 * @param format - Color format, supports 'rgb' (default), 'rgba', 'grb', 'bgr'
 * @param normalize - Whether to normalize 0-255 values to 0.0-1.0 range
 * @returns List of color tuples, each representing a pixel's color
 */
function opcDataToPixels(
    data: Uint8Array,
    format: 'rgb' | 'rgba' | 'grb' | 'bgr' = 'rgb',
    normalize: boolean = false
): number[][] {}