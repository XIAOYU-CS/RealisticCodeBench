describe('TestCheckXorSum', () => {

    it('test correct XOR sums', () => {
        const combination: number[][] = [
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });


    it('test incorrect XOR sums', () => {
        const combination: number[][] = [
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });

    it('test edge case with zero', () => {
        const combination: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0]];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });


    it('test large numbers', () => {
        const combination: number[][] = [
            [0x6b000000, 0x00000000, 0x00000012, 0x00000000, 0x76000000, 0x00000000, 0x00000000, 0x00000000],
            [0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(false);
    });

    it('test multiple rows', () => {
        const combination: number[][] = [
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00],
            [0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00]
        ];
        expect(checkSpecifiedColumnXorMatch(combination)).toBe(true);
    });
});