describe('Test translate3dPointCloud', () => {

    it('testSimpleTranslation', () => {
        const pointCloud = new Float32Array([1.0, 2.0, 3.0]);
        const translationVector = new Float32Array([1.0, 1.0, 1.0]);
        const expectedOutput = new Float32Array([2.0, 3.0, 4.0]);

        const result = translate3dPointCloud(pointCloud, translationVector);
        expect(result).toEqual(expectedOutput);
    });

    it('testMultiplePointsTranslation', () => {
        const pointCloud = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
        const translationVector = new Float32Array([1.0, 2.0, 3.0]);
        const expectedOutput = new Float32Array([2.0, 4.0, 6.0, 5.0, 7.0, 9.0]);

        const result = translate3dPointCloud(pointCloud, translationVector);
        expect(result).toEqual(expectedOutput);
    });

    it('testZeroTranslation', () => {
        const pointCloud = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);
        const translationVector = new Float32Array([0.0, 0.0, 0.0]);
        const expectedOutput = new Float32Array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]);

        const result = translate3dPointCloud(pointCloud, translationVector);
        expect(result).toEqual(expectedOutput);
    });

    it('testNegativeTranslation', () => {
        const pointCloud = new Float32Array([1.0, 2.0, 3.0]);
        const translationVector = new Float32Array([-1.0, -2.0, -3.0]);
        const expectedOutput = new Float32Array([0.0, 0.0, 0.0]);

        const result = translate3dPointCloud(pointCloud, translationVector);
        expect(result).toEqual(expectedOutput);
    });

    it('testInvalidTranslationVectorLength', () => {
        const pointCloud = new Float32Array([1.0, 2.0, 3.0]);
        const translationVector = new Float32Array([1.0, 2.0]);

        expect(() => translate3dPointCloud(pointCloud, translationVector)).toThrow();
    });
});
