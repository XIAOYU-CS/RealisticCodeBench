/**
 * Convert ArrayBuffer data to Base64 encoded string, supporting URL-safe options and padding control
 *
 * @param {ArrayBuffer|Uint8Array|Buffer|Array} arrayBuffer - Byte buffer data
 * @param {boolean} urlSafe - Whether to use URL-safe Base64 encoding (replace + with -, / with _)
 * @param {boolean} keepPadding - Whether to keep padding characters =
 * @returns {string} Processed Base64 encoded string
 */
function arrayBufferToBase64(arrayBuffer, urlSafe = false, keepPadding = true) {
    try {
        // Uniformly convert to Uint8Array
        let uint8Array;
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
        let base64Str;
        if (typeof Buffer !== 'undefined') {
            // Node.js environment
            base64Str = Buffer.from(uint8Array).toString('base64');
        } else {
            // Browser environment
            base64Str = btoa(String.fromCharCode.apply(null, uint8Array));
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
        throw new Error(`Error occurred while converting ArrayBuffer to Base64: ${error.message}`);
    }
}