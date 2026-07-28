/**
 * Converts OPC raw data to a list of color pixels
 *
 * @param {Uint8Array} data - Raw byte data
 * @param {string} format - Color format, supports 'rgb' (default), 'rgba', 'grb', 'bgr'
 * @param {boolean} normalize - Whether to normalize 0-255 values to 0.0-1.0 range
 * @returns {Array} List of color tuples, each representing a pixel's color
 */
function opcDataToPixels(data, format = 'rgb', normalize = false) {}