describe('TestGet3DCoordinates', () => {
    let K: number[][];

    beforeEach(() => {
        // Define a common intrinsic matrix for testing
        K = [
            [1000, 0, 320],
            [0, 1000, 240],
            [0, 0, 1]
        ];
    });

    it('test_center_coordinates', () => {
        const result = get3DCoordinates(K, 100, 320, 240);
        expect(result).toEqual([0.0, 0.0, 100]);
    });

    it('test_boundary_coordinates', () => {
        const result = get3DCoordinates(K, 50, 640, 480);
        const expected_x = (640 - 320) / 1000 * 50;
        const expected_y = (480 - 240) / 1000 * 50;
        expect(result).toEqual([expected_x, expected_y, 50]);
    });

    it('test_negative_depth', () => {
        const result = get3DCoordinates(K, -100, 320, 240);
        expect(result).toEqual([0.0, 0.0, -100]);
    });

    it('test_zero_depth', () => {
        const result = get3DCoordinates(K, 0, 320, 240);
        expect(result).toEqual([0.0, 0.0, 0.0]);
    });

    it('test_non_integer_values', () => {
        const result = get3DCoordinates(K, 100, 320.5, 240.5);
        const expected_x = (320.5 - 320) / 1000 * 100;
        const expected_y = (240.5 - 240) / 1000 * 100;
        expect(result).toEqual([expected_x, expected_y, 100]);
    });
});