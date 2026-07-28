describe('TestExtractCharacterBits', () => {
    it('test_case_1_valid_utf8', () => {
        const byte_array = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);
        const char = 'W';
        const result = extractCharacterBits(byte_array, char, 'utf-8');
        const expected_result = [7, '01010111'];
        expect(result).toEqual(expected_result);
    });

    it('test_case_2_non_existent_character', () => {
        const byte_array = new Uint8Array([84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 116, 101, 115, 116, 46]);
        const char = 'z';
        const result = extractCharacterBits(byte_array, char, 'utf-8');
        expect(result).toBeUndefined();
    });

    it('test_case_3_invalid_encoding', () => {
        const byte_array = new Uint8Array([255, 254]);
        const char = 'A';
        const result = extractCharacterBits(byte_array, char, 'ascii');
        expect(result).toBeUndefined();
    });

    it('test_case_4_valid_utf16', () => {
        const byte_array = new Uint8Array([255, 254, 72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 44, 0, 32, 0, 87, 0, 111, 0, 114, 0, 108, 0, 100, 0, 33, 0]);
        const char = '!';
        const result = extractCharacterBits(byte_array, char, 'utf-16');
        const expected_result = [12, '00100001 00000000'];
        expect(result).toEqual(expected_result);
    });

    it('test_case_5_special_characters_utf8', () => {
        const byte_array = new Uint8Array([80, 121, 116, 104, 111, 110, 32, 240, 159, 144, 141, 32, 105, 115, 32, 102, 117, 110, 33]);
        const char = '🐍';
        const result = extractCharacterBits(byte_array, char, 'utf-8');
        const expected_result = [7, '11110000 10011111 10010000 10001101'];
        expect(result).toEqual(expected_result);
    });
});
