describe("Gaussian Weight Calculation Tests", () => {

    test("Zero Intensity Difference", () => {
        const intensityDiff = 0.0;
        const sigmaColor = 1.0;
        expect(gaussianWeight(intensityDiff, sigmaColor)).toBeCloseTo(1.0, 3);
    });

    test("Positive Intensity Difference", () => {
        const intensityDiff = 2.0;
        const sigmaColor = 2.0;
        const expectedWeight = Math.exp(-(intensityDiff * intensityDiff) / (2 * sigmaColor * sigmaColor));
        expect(gaussianWeight(intensityDiff, sigmaColor)).toBeCloseTo(expectedWeight, 3);
    });

    test("Negative Intensity Difference", () => {
        const intensityDiff = -2.0;
        const sigmaColor = 2.0;
        const expectedWeight = Math.exp(-(intensityDiff * intensityDiff) / (2 * sigmaColor * sigmaColor));
        expect(gaussianWeight(intensityDiff, sigmaColor)).toBeCloseTo(expectedWeight, 3);
    });

    test("Small Sigma Color", () => {
        const intensityDiff = 1.0;
        const sigmaColor = 0.1;
        const expectedWeight = Math.exp(-(intensityDiff * intensityDiff) / (2 * sigmaColor * sigmaColor));
        expect(gaussianWeight(intensityDiff, sigmaColor)).toBeCloseTo(expectedWeight, 3);
    });

    test("Large Sigma Color", () => {
        const intensityDiff = 1.0;
        const sigmaColor = 100.0;
        const expectedWeight = Math.exp(-(intensityDiff * intensityDiff) / (2 * sigmaColor * sigmaColor));
        expect(gaussianWeight(intensityDiff, sigmaColor)).toBeCloseTo(expectedWeight, 3);
    });
});