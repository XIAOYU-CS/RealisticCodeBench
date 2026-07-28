/**
 * Computes the CRC8 check value of the input byte data
 * @param {Uint8Array} data - Input byte data (as Uint8Array)
 * @param {number} [polyval=0xEB] - CRC polynomial (8-bit integer, 0x00-0xFF)
 * @param {number} [init=0xFF] - Initial value (8-bit integer, 0x00-0xFF)
 * @returns {number} The calculated CRC8 check value (0x00-0xFF)
 * @throws {TypeError} If data is not a Uint8Array
 * @throws {RangeError} If polyval, init or any data byte is out of 0x00-0xFF range
 */
function crc8(data, polyval = 0xEB, init = 0xFF) {}