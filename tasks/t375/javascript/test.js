describe('Frame.computeStereoFromRGBD', () => {
    let frame;

    beforeEach(() => {
        frame = new Frame(2);
        frame.mbf = 5000.0;

        frame.mvKeys = [
            createKeypoint(100.0, 200.0),
            createKeypoint(300.0, 400.0)
        ];

        frame.mvKeysUn = [
            createKeypoint(105.0, 205.0),
            createKeypoint(305.0, 405.0)
        ];
    });

    test('should correctly process valid float32 depth map', () => {
        const depthMap = {
            data: new Float32Array(500 * 500).fill(1000.0),
            width: 500,
            height: 500,
            type: 'float32'
        };

        depthMap.data[200 * 500 + 100] = 500.0;  // For first keypoint
        depthMap.data[400 * 500 + 300] = 250.0;  // For second keypoint

        frame.computeStereoFromRGBD(depthMap);

        expect(frame.mvDepth[0]).toBe(500.0);
        expect(frame.mvuRight[0]).toBe(105.0 - (5000.0 / 500.0));  // 95.0
        expect(frame.mvDepth[1]).toBe(250.0);
        expect(frame.mvuRight[1]).toBe(305.0 - (5000.0 / 250.0));  // 285.0
    });

    test('should correctly process valid uint16 depth map (mm to meters conversion)', () => {
        const depthMap = {
            data: new Uint16Array(500 * 500).fill(1000),  // 1000mm = 1m
            width: 500,
            height: 500,
            type: 'uint16'
        };

        depthMap.data[200 * 500 + 100] = 500;  // 500mm = 0.5m
        depthMap.data[400 * 500 + 300] = 250;  // 250mm = 0.25m

        frame.computeStereoFromRGBD(depthMap);

        expect(frame.mvDepth[0]).toBe(0.5);
        expect(frame.mvuRight[0]).toBe(105.0 - (5000.0 / 0.5));  // -9895.0
        expect(frame.mvDepth[1]).toBe(0.25);
        expect(frame.mvuRight[1]).toBe(305.0 - (5000.0 / 0.25));  // -19695.0
    });

    test('should throw error for empty depth map', () => {
        const emptyMap = { data: new Float32Array(0), width: 0, height: 0, type: 'float32' };

        expect(() => {
            frame.computeStereoFromRGBD(emptyMap);
        }).toThrow();

        expect(() => {
            frame.computeStereoFromRGBD(undefined);
        }).toThrow();
    });

    test('should throw error for unsupported depth map type', () => {
        const invalidMap = {
            data: new Uint8Array(500 * 500).fill(100),
            width: 500,
            height: 500,
            type: 'uint8'
        };

        expect(() => {
            frame.computeStereoFromRGBD(invalidMap);
        }).toThrow();
    });

    test('should handle keypoints outside depth map bounds', () => {
        const smallDepthMap = {
            data: new Float32Array(200 * 200).fill(1000.0),
            width: 200,
            height: 200,
            type: 'float32'
        };

        frame.computeStereoFromRGBD(smallDepthMap);

        expect(frame.mvDepth[0]).toBe(-1.0);
        expect(frame.mvuRight[0]).toBe(-1.0);
        expect(frame.mvDepth[1]).toBe(-1.0);
        expect(frame.mvuRight[1]).toBe(-1.0);
    });
});
