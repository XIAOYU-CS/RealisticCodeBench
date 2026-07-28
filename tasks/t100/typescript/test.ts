describe('TestextractTranslationFromMatrixFunction', () => {
  describe('test_identity_matrix', () => {
      it('should return the correct translation for the identity matrix', () => {
          const matrix: number[][] = [
              [1, 0, 0],
              [0, 1, 0],
              [0, 0, 1]
          ];
          const expectedTranslation: number[] = [0.0, 0.0];
          expect(extractTranslationFromMatrix(matrix)).toEqual(expectedTranslation);
      });
  });

  describe('test_translation_matrix', () => {
      it('should return the correct translation for a translation matrix', () => {
          const matrix: number[][] = [
              [1, 0, 5],
              [0, 1, 10],
              [0, 0, 1]
          ];
          const expectedTranslation: number[] = [5.0, 10.0];
          expect(extractTranslationFromMatrix(matrix)).toEqual(expectedTranslation);
      });
  });

  describe('test_negative_translation', () => {
      it('should return the correct translation for a translation matrix with negative values', () => {
          const matrix: number[][] = [
              [1, 0, -3],
              [0, 1, -6],
              [0, 0, 1]
          ];
          const expectedTranslation: number[] = [-3.0, -6.0];
          expect(extractTranslationFromMatrix(matrix)).toEqual(expectedTranslation);
      });
  });

      describe('test_rotation_and_translation', () => {
        it('should correctly extract translation from a matrix with 90-degree rotation and translation (2, 3)', () => {
            const matrix = [
                [0, -1, 2],
                [1,  0, 3],
                [0,  0, 1]
            ];
            const expectedTranslation = [2.0, 3.0];
            expect(extractTranslationFromMatrix(matrix)).toEqual(expectedTranslation);
        });
    });

    describe('test_scaling_and_translation', () => {
        it('should correctly extract translation from a matrix with scaling (2x, 0.5y) and translation (-1, 4)', () => {
            const matrix = [
                [2,   0, -1],
                [0, 0.5,  4],
                [0,   0,  1]
            ];
            const expectedTranslation = [-1.0, 4.0];
            expect(extractTranslationFromMatrix(matrix)).toEqual(expectedTranslation);
        });
    });
});