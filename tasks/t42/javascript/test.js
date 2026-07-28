import assert from 'assert';
describe('TestGet3DCoordinates', () => {
    let K;

    beforeEach(() => {
        K = [
            [1000, 0, 320],
            [0, 1000, 240],
            [0, 0, 1]
        ];
    });

    it('test center coordinates', () => {
        const result = get3DCoordinates(K, 100, 320, 240);
        assert.deepStrictEqual(result, [0.0, 0.0, 100]);
    });

    it('test boundary coordinates', () => {
        const result = get3DCoordinates(K, 50, 640, 480);
        const expected_x = (640 - 320) / 1000 * 50;
        const expected_y = (480 - 240) / 1000 * 50;
        assert.deepStrictEqual(result, [expected_x, expected_y, 50]);
    });

    it('test negative depth', () => {
        const result = get3DCoordinates(K, -100, 320, 240);
        assert.deepStrictEqual(result, [0.0, 0.0, -100]);
    });

    it('test zero depth', () => {
        const result = get3DCoordinates(K, 0, 320, 240);
        assert.deepStrictEqual(result, [0.0, 0.0, 0.0]);
    });

    it('test non-integer values', () => {
        const result = get3DCoordinates(K, 100, 320.5, 240.5);
        const expected_x = (320.5 - 320) / 1000 * 100;
        const expected_y = (240.5 - 240) / 1000 * 100;
        assert.deepStrictEqual(result, [expected_x, expected_y, 100]);
    });
});
