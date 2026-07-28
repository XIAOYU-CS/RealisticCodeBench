/**
 * Converts a decimal number to its binary representation in either 32-bit or 64-bit format.
 *
 * @param {number} decimalValue - The decimal number to convert.
 * @param {number} bitLength - The desired bit length for the binary representation (32 or 64).
 * @returns {string | null} The binary string representation of the decimal number if the bit length
 *                          is valid, otherwise `null`.
 * @throws {Error} Throws an error if the bit length is not 32 or 64.
 */
function convertDecimalToBinary(decimalValue: number, bitLength: number): string | null {
    if (bitLength === 32) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setFloat32(0, decimalValue, false);
        return view.getUint32(0, false).toString(2).padStart(32, '0');
    } else if (bitLength === 64) {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat64(0, decimalValue, false);
        return view.getUint32(0, false).toString(2).padStart(32, '0') +
            view.getUint32(4, false).toString(2).padStart(32, '0');
    } else {
        throw new Error("Invalid bit length. Please specify either 32 or 64.");
    }
}
