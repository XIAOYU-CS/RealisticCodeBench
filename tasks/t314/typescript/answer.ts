/**
 * Computes the CRC8 check value of the input byte data
 * @param {Uint8Array} data - Input byte data
 * @param {number} [polyval=0xEB] - CRC polynomial (8-bit integer, 0x00-0xFF)
 * @param {number} [init=0xFF] - Initial value (8-bit integer, 0x00-0xFF)
 * @returns {number} The calculated CRC8 check value (0x00-0xFF)
 * @throws {TypeError} If data is not a Uint8Array
 * @throws {RangeError} If polyval, init or any data byte is out of 0x00-0xFF range
 */
function crc8(data: Uint8Array, polyval: number = 0xEB, init: number = 0xFF): number {
    if (!(data instanceof Uint8Array)) {
        throw new TypeError("data must be a Uint8Array");
    }

    if (!Number.isInteger(polyval) || polyval < 0x00 || polyval > 0xFF) {
        throw new RangeError("polyval must be an 8-bit integer (0x00-0xFF)");
    }

    if (!Number.isInteger(init) || init < 0x00 || init > 0xFF) {
        throw new RangeError("init must be an 8-bit integer (0x00-0xFF)");
    }

    let crc = init;
    for (const b of data) {
        // Validate each byte (Uint8Array should enforce this, but double-check)
        if (b < 0x00 || b > 0xFF) {
            throw new RangeError(`Invalid byte in data: ${b} (must be integer between 0 and 255)`);
        }

        crc ^= b;
        for (let i = 0; i < 8; i++) {
            const msb = crc & 0x80;
            crc <<= 1;
            if (msb) {
                crc ^= polyval;
            }
            crc &= 0xFF;
        }
    }
    return crc & 0xFF;
}

function verifyCrc8(data: Uint8Array, expectedCrc: number, polyval: number = 0xEB, init: number = 0xFF): boolean {
    if (!Number.isInteger(expectedCrc) || expectedCrc < 0x00 || expectedCrc > 0xFF) {
        throw new RangeError("expectedCrc must be an 8-bit integer (0x00-0xFF)");
    }

    return crc8(data, polyval, init) === expectedCrc;
}
