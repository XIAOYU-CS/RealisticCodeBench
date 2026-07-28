describe("BMI calculations", () => {
    describe("Valid BMI calculations", () => {
        test("Normal weight", () => {
            expect(calculateBMI(70, 1.75)).toBeCloseTo(22.86, 2);
        });

        test("Underweight", () => {
            expect(calculateBMI(50, 1.75)).toBeCloseTo(16.33, 2);
        });

        test("Overweight", () => {
            expect(calculateBMI(80, 1.75)).toBeCloseTo(26.12, 2);
        });

        test("Obesity", () => {
            expect(calculateBMI(100, 1.75)).toBeCloseTo(32.65, 2);
        });
    });

    describe("Invalid BMI calculations", () => {
        test("Negative weight", () => {
            expect(() => calculateBMI(-70, 1.75)).toThrow(Error);
        });

        test("Zero height", () => {
            expect(() => calculateBMI(70, 0)).toThrow(Error);
        });

        test("Negative height", () => {
            expect(() => calculateBMI(70, -1.75)).toThrow(Error);
        });
    });
});