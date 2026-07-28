describe('TestCheckXorSum', () => {
    it('test_correct_xor_sums', () => {
        const combination = [
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });

    it('test_incorrect_xor_sums', () => {
        const combination = [
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });

    it('test_edge_case_with_zero', () => {
        const combination = [[0, 0, 0, 0, 0, 0, 0, 0]];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });

    it('test_large_numbers', () => {
        const combination = [
            [0x6b000000, 0x00000000, 0x00000012, 0x00000000, 0x76000000, 0x00000000, 0x00000000, 0x00000000],
            [0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });

    it('test_multiple_rows', () => {
        const combination = [
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(true);
    });
});