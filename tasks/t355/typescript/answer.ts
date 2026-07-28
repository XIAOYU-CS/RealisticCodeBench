/**
 * Convert ArrayBuffer data to Base64 encoded string, supporting URL-safe options and padding control
 *
 * @param arrayBuffer - Byte buffer data (ArrayBuffer, Uint8Array, Buffer, or Array of numbers)
 * @param urlSafe - Whether to use URL-safe Base64 encoding (replace + with -, / with _)
 * @param keepPadding - Whether to keep padding characters =
 * @returns Processed Base64 encoded string
 */
function arrayBufferToBase64(
    arrayBuffer: ArrayBuffer | Uint8Array | Buffer | number[] | null | undefined,
    urlSafe: boolean = false,
    keepPadding: boolean = true
): string {
    try {
        // Input validation
        if (arrayBuffer === null || arrayBuffer === undefined) {
            throw new Error('Input cannot be null or undefined');
        }

        // Uniformly convert to Uint8Array
        let uint8Array: Uint8Array;
        if (arrayBuffer instanceof ArrayBuffer) {
            uint8Array = new Uint8Array(arrayBuffer);
        } else if (arrayBuffer instanceof Uint8Array) {
            uint8Array = arrayBuffer;
        } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(arrayBuffer)) {
            // Node.js Buffer
            uint8Array = new Uint8Array(arrayBuffer);
        } else if (Array.isArray(arrayBuffer)) {
            // Array of numbers
            uint8Array = new Uint8Array(arrayBuffer);
        } else {
            throw new Error('Unsupported input type');
        }

        // Convert to Base64
        let base64Str: string;
        if (typeof Buffer !== 'undefined') {
            // Node.js environment
            base64Str = Buffer.from(uint8Array).toString('base64');
        } else {
            // Browser environment
            base64Str = btoa(String.fromCharCode.apply(null, Array.from(uint8Array)));
        }

        // Apply URL-safe transformation if needed
        if (urlSafe) {
            base64Str = base64Str.replace(/\+/g, '-').replace(/\//g, '_');
        }

        // Handle padding
        if (!keepPadding) {
            base64Str = base64Str.replace(/=+$/, '');
        }

        return base64Str;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error occurred while converting ArrayBuffer to Base64: ${error.message}`);
        } else {
            throw new Error('Error occurred while converting ArrayBuffer to Base64: Unknown error');
        }
    }
}