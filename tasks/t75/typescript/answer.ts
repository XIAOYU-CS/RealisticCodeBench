function extractCharacterBits(byteArray: Uint8Array, char: string, charset: string = 'utf-8'): [number, string] | null {
    const normalized = charset.toLowerCase().replace(/_/g, '-');
    const encode = (value: string, includeBom: boolean = false): Uint8Array => {
        if (normalized === 'ascii' || normalized === 'us-ascii') {
            const bytes = Array.from(value, c => c.charCodeAt(0));
            if (bytes.some(byte => byte > 0x7f)) {
                throw new Error('Invalid ASCII character');
            }
            return new Uint8Array(bytes);
        }
        if (normalized === 'utf-16' || normalized === 'utf-16le' || normalized === 'utf16le') {
            const bytes: number[] = [];
            if (includeBom && normalized === 'utf-16') {
                bytes.push(0xff, 0xfe);
            }
            for (let i = 0; i < value.length; i++) {
                const code = value.charCodeAt(i);
                bytes.push(code & 0xff, code >> 8);
            }
            return new Uint8Array(bytes);
        }
        return new TextEncoder().encode(value);
    };

    try {
        // Decode byte array to string using the specified character set
        if ((normalized === 'ascii' || normalized === 'us-ascii') && Array.from(byteArray).some(byte => byte > 0x7f)) {
            throw new Error('Failed to decode the byte array.');
        }
        const string = new TextDecoder(charset, { fatal: true }).decode(byteArray);
        
        // Check if the character is in the decoded string
        if (string.includes(char)) {
            const position = string.indexOf(char);
            
            // Find the byte position of the character
            const bytePosition = encode(string.slice(0, position), true).length;
            
            // Determine the length of the character in bytes
            const charLength = encode(char, true).length;
            
            // Extract the bits corresponding to the character
            const bits = byteArray.subarray(bytePosition, bytePosition + charLength);
            
            // Convert bits to a human-readable binary string
            const bitsAsString = Array.from(bits).map(byte => `${byte.toString(2).padStart(8, '0')}`).join(' ');
            
            return [position, bitsAsString];
        } else {
            console.log(`The character '${char}' is not in the byte array.`);
            return null;
        }
    } catch (error) {
        if (error instanceof Error && error.name === 'SyntaxError') {
            console.log("Failed to decode the byte array.");
        }
        return null;
    }
}
