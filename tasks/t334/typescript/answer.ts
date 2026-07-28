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
): number[][] {
    const pixels: number[][] = [];
    const bytesPerPixel = format === 'rgba' ? 4 : 3;

    const pixelCount = Math.floor(data.length / bytesPerPixel);

    for (let i = 0; i < pixelCount; i++) {
        const start = i * bytesPerPixel;
        const pixelBytes = data.subarray(start, start + bytesPerPixel);

        let color: number[];

        switch (format) {
            case 'rgb':
                color = [pixelBytes[0], pixelBytes[1], pixelBytes[2]];
                break;
            case 'rgba':
                color = [pixelBytes[0], pixelBytes[1], pixelBytes[2], pixelBytes[3]];
                break;
            case 'grb':
                color = [pixelBytes[1], pixelBytes[0], pixelBytes[2]];
                break;
            case 'bgr':
                color = [pixelBytes[2], pixelBytes[1], pixelBytes[0]];
                break;
            default:
                throw new Error(`Unsupported color format: ${format}`);
        }

        if (normalize) {
            color = color.map(channel => channel / 255);
        }

        pixels.push(color);
    }

    return pixels;
}