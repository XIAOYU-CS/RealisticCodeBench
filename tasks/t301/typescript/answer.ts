import * as nodeFs from 'fs';

/**
 * Reads frame data from a binary file, supporting custom frame structures and data types
 *
 * @param filePath - The binary file path
 * @param frameSpec - Frame structure description array [elementsPerFrame, dataFormat]
 *   - elementsPerFrame: Number of elements contained in each frame
 *   - dataFormat: Buffer format string (e.g., '<I' for little-endian 32-bit unsigned integer)
 * @param ignoreIncomplete - Whether to ignore incomplete frames (False will warn, True will silently ignore)
 * @returns List of frame data, where each element is a frame array containing the specified number of elements
 * @throws Error if parameters are invalid or file operations fail
 */
function readBinaryFrames(
    filePath: string,
    frameSpec: [number, string],
    ignoreIncomplete: boolean = false
): Array<Array<number>> {
    const [elementsPerFrame, dataFormat] = frameSpec;

    // Validate parameter validity
    if (elementsPerFrame <= 0) {
        throw new Error(`Number of elements per frame must be positive, got ${elementsPerFrame}`);
    }

    let elementSize: number;
    let isLittleEndian: boolean;

    // Parse data format and determine element size
    switch (dataFormat) {
        case '<I': // little-endian unsigned int
            elementSize = 4;
            isLittleEndian = true;
            break;
        case '>f': // big-endian float
            elementSize = 4;
            isLittleEndian = false;
            break;
        case '<f': // little-endian float
            elementSize = 4;
            isLittleEndian = true;
            break;
        default:
            throw new Error(`Invalid data format string: ${dataFormat}`);
    }

    const frameSize = elementsPerFrame * elementSize;
    if (frameSize <= 0) {
        throw new Error(`Calculated frame size is invalid: ${frameSize} bytes`);
    }

    let buffer: Buffer;
    try {
        buffer = nodeFs.readFileSync(filePath);
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            throw new Error(`File not found: ${filePath}`);
        } else {
            throw new Error(`Failed to read file ${filePath}: ${err.message}`);
        }
    }

    const frames: Array<Array<number>> = [];
    let offset = 0;

    // Read complete frames
    while (offset + frameSize <= buffer.length) {
        const frame: Array<number> = [];
        for (let i = 0; i < elementsPerFrame; i++) {
            const elemOffset = offset + i * elementSize;
            let value: number;

            // Parse a single element based on format
            if (dataFormat === '<I') {
                value = buffer.readUInt32LE(elemOffset);
            } else if (dataFormat === '>f') {
                value = buffer.readFloatBE(elemOffset);
            } else if (dataFormat === '<f') {
                value = buffer.readFloatLE(elemOffset);
            }

            frame.push(value);
        }
        frames.push(frame);
        offset += frameSize;
    }

    // Handle incomplete frames
    if (offset < buffer.length) {
        const msg = `File ${filePath} contains incomplete frame, expected ${frameSize} bytes, got ${buffer.length - offset} bytes, which has been ignored`;
        if (!ignoreIncomplete) {
            console.warn(`Warning: ${msg}`);
        }
    }

    return frames;
}
