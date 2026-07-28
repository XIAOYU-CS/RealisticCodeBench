describe("Spatial Weight Calculation Tests", () => {
    
    test("Zero Spatial Difference", () => {
        const spatial_diff = 0.0;
        const sigma_space = 1.0; // arbitrary sigma value
        expect(spatialWeight(spatial_diff, sigma_space)).toBeCloseTo(1.0, 3);
    });

    test("Positive Spatial Difference", () => {
        const spatial_diff = 2.0;
        const sigma_space = 2.0;
        const expected_weight = Math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        expect(spatialWeight(spatial_diff, sigma_space)).toBeCloseTo(expected_weight, 3);
    });

    test("Negative Spatial Difference", () => {
        const spatial_diff = -2.0;
        const sigma_space = 2.0;
        const expected_weight = Math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        expect(spatialWeight(spatial_diff, sigma_space)).toBeCloseTo(expected_weight, 3);
    });

    test("Small Sigma Space", () => {
        const spatial_diff = 1.0;
        const sigma_space = 0.1;
        const expected_weight = Math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        expect(spatialWeight(spatial_diff, sigma_space)).toBeCloseTo(expected_weight, 3);
    });

    test("Large Sigma Space", () => {
        const spatial_diff = 1.0;
        const sigma_space = 100.0;
        const expected_weight = Math.exp(-(spatial_diff * spatial_diff) / (2 * sigma_space * sigma_space));
        expect(spatialWeight(spatial_diff, sigma_space)).toBeCloseTo(expected_weight, 3);
    });

});