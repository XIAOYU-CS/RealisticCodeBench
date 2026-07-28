describe("Calculate Steering Angle Tests", () => {
    const wheelbase = 2.5;

    test("Normal case", () => {
        const angularVelocity = 1.0;
        const speed = 10.0;
        const expectedAngle = Math.atan((angularVelocity * wheelbase) / speed);
        expect(calculateSteeringAngle(angularVelocity, speed, wheelbase)).toBeCloseTo(expectedAngle);
    });

    test("Zero speed", () => {
        const angularVelocity = 1.0;
        const speed = 0.0;
        expect(() => calculateSteeringAngle(angularVelocity, speed, wheelbase)).toThrow(Error);
    });

    test("Negative speed", () => {
        const angularVelocity = 1.0;
        const speed = -5.0;
        expect(() => calculateSteeringAngle(angularVelocity, speed, wheelbase)).toThrow(Error);
    });

    test("Zero angular velocity", () => {
        const angularVelocity = 0.0;
        const speed = 10.0;
        const expectedAngle = 0.0;
        expect(calculateSteeringAngle(angularVelocity, speed, wheelbase)).toBeCloseTo(expectedAngle);
    });

    test("Large values", () => {
        const angularVelocity = 100.0;
        const speed = 1000.0;
        const expectedAngle = Math.atan((angularVelocity * wheelbase) / speed);
        expect(calculateSteeringAngle(angularVelocity, speed, wheelbase)).toBeCloseTo(expectedAngle);
    });

    test("High angular velocity", () => {
        const angularVelocity = 10.0;
        const speed = 1.0;
        const expectedAngle = Math.atan((angularVelocity * wheelbase) / speed);
        expect(calculateSteeringAngle(angularVelocity, speed, wheelbase)).toBeCloseTo(expectedAngle);
    });
});