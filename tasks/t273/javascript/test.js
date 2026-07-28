describe("simpsonsRule", () => {
    test("integrates x^2 from 0 to 1", () => {
        expect(simpsonsRule(0.0, 1.0, 10)).toBeCloseTo(1.0 / 3.0, 2);
    });

    test("integrates x^2 from 0 to 2", () => {
        expect(simpsonsRule(0.0, 2.0, 10)).toBeCloseTo(8.0 / 3.0, 2);
    });

    test("integrates x^2 from -1 to 0", () => {
        expect(simpsonsRule(-1.0, 0.0, 10)).toBeCloseTo(1.0 / 3.0, 2);
    });

    test("integrates x^2 over a large interval", () => {
        expect(simpsonsRule(0.0, 10.0, 20)).toBeCloseTo(1000.0 / 3.0, 2);
    });

    test("rejects invalid subinterval counts", () => {
        expect(() => simpsonsRule(0.0, 1.0, 9)).toThrow(RangeError);
    });
});
