import * as iconv from 'iconv-lite';

function findShiftJisNotGbk(): string[] {
    // Array to store characters that are in Shift-JIS but not in GBK
    const uniqueToShiftJis: string[] = [];

    // Iterate over a range of Unicode code points
    // The BMP goes up to U+FFFF, which is 65535 in decimal
    for (let codepoint = 0; codepoint < 65536; codepoint++) {
        const character = String.fromCodePoint(codepoint);

        if (canEncode(character, 'shift_jis') && !canEncode(character, 'gbk')) {
            uniqueToShiftJis.push(character);
        }
    }

    return uniqueToShiftJis;
}

function canEncode(character: string, encoding: string): boolean {
    const encoded = iconv.encode(character, encoding);
    return iconv.decode(encoded, encoding) === character;
}
