describe('TestConvertToShortFormat', () => {
    it('test basic case', () => {
        expect(convertToShortFormat("f1_p1_g1_b1_c1")).toBe("fpgbc");
    });

    it('test multiple segments', () => {
        expect(convertToShortFormat("a2_b3_c4")).toBe("abc");
    });

    it('test non-alphanumeric characters', () => {
        expect(convertToShortFormat("hello_world_test")).toBe("hwt");
    });

    it('test single segment', () => {
        expect(convertToShortFormat("single")).toBe("s");
    });

    it('test segments starting with symbols and digits', () => {
        expect(convertToShortFormat("$cost_#tag_9lives")).toBe("$#9");
    });
});
