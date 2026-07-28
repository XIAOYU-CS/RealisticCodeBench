describe('Testtranslate3dPointCloud', () => {
    describe('test_simple_translation', () => {
        it('should correctly translate a single point', () => {
            const pointCloud = [[1.0, 2.0, 3.0]];
            const translationVector = [1.0, 1.0, 1.0];
            const expectedOutput = [[2.0, 3.0, 4.0]];
            expect(translate3dPointCloud(pointCloud, translationVector)).toEqual(expectedOutput);
        });
    });

    describe('test_multiple_points_translation', () => {
        it('should correctly translate multiple points', () => {
            const pointCloud = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]];
            const translationVector = [1.0, 2.0, 3.0];
            const expectedOutput = [[2.0, 4.0, 6.0], [5.0, 7.0, 9.0]];
            expect(translate3dPointCloud(pointCloud, translationVector)).toEqual(expectedOutput);
        });
    });

    describe('test_zero_translation', () => {
        it('should return the same point cloud when translating by a zero vector', () => {
            const pointCloud = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]];
            const translationVector = [0.0, 0.0, 0.0];
            const expectedOutput = pointCloud;
            expect(translate3dPointCloud(pointCloud, translationVector)).toEqual(expectedOutput);
        });
    });

    describe('test_negative_translation', () => {
        it('should correctly translate with negative values', () => {
            const pointCloud = [[1.0, 2.0, 3.0]];
            const translationVector = [-1.0, -2.0, -3.0];
            const expectedOutput = [[0.0, 0.0, 0.0]];
            expect(translate3dPointCloud(pointCloud, translationVector)).toEqual(expectedOutput);
        });
    });

    describe('test_invalid_translation_vector_length', () => {
        it('should reject translation vectors that are not length 3', () => {
            const pointCloud = [[1.0, 2.0, 3.0]];
            const translationVector = [1.0, 2.0];
            expect(() => translate3dPointCloud(pointCloud, translationVector)).toThrow();
        });
    });
});
