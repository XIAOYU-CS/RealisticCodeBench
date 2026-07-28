/**
 * Converts OPC raw data to a list of color pixels
 *
 * @param {Uint8Array} data - Raw byte data
 * @param {string} format - Color format, supports 'rgb' (default), 'rgba', 'grb', 'bgr'
 * @param {boolean} normalize - Whether to normalize 0-255 values to 0.0-1.0 range
 * @returns {Array} List of color tuples, each representing a pixel's color
 */
function opcDataToPixels(data, format = 'rgb', normalize = false) {
    const pixels = [];
    const bytesPerPixel = format === 'rgba' ? 4 : 3;

    const pixelCount = Math.floor(data.length / bytesPerPixel);

    for (let i = 0; i < pixelCount; i++) {
        const start = i * bytesPerPixel;
        const pixelBytes = data.subarray(start, start + bytesPerPixel);

        let color;

        if (format === 'rgb') {
            const r = pixelBytes[0];
            const g = pixelBytes[1];
            const b = pixelBytes[2];
            color = [r, g, b];
        } else if (format === 'rgba') {
            const r = pixelBytes[0];
            const g = pixelBytes[1];
            const b = pixelBytes[2];
            const a = pixelBytes[3];
            color = [r, g, b, a];
        } else if (format === 'grb') {
            const g = pixelBytes[0];
            const r = pixelBytes[1];
            const b = pixelBytes[2];
            color = [r, g, b];
        } else if (format === 'bgr') {
            const b = pixelBytes[0];
            const g = pixelBytes[1];
            const r = pixelBytes[2];
            color = [r, g, b];
        } else {
            throw new Error(`Unsupported color format: ${format}`);
        }

        if (normalize) {
            color = color.map(channel => channel / 255);
        }

        pixels.push(color);
    }

    return pixels;
}