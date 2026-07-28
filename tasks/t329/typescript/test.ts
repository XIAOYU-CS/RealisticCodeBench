describe('makeSubimages', () => {
    test('basic functionality with pad mode', () => {
        const aData: ImageData2D = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];

        const aMask: MaskData = [
            [false, true, false, false],
            [false, false, true, false],
            [true, false, false, false],
            [false, false, false, true]
        ];

        const { b, c } = makeSubimages(aData, aMask, 2, 2, "pad");

        expect(b.length).toBe(2);
        expect((b[0] as number[][]).length).toBe(2);
        expect((b[0][0] as number[]).length).toBe(4);

        expect(c.length).toBe(2);
        expect(c[0].length).toBe(2);

        const firstSubImage = b[0][0] as number[];
        expect([1, 5]).toContain(firstSubImage[0]);
        expect([1, 5]).toContain(firstSubImage[1]);
    });

    test('keep mode with edge subimages', () => {
        const aData: ImageData2D = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        const aMask: MaskData = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ];

        const { b, c } = makeSubimages(aData, aMask, 2, 2, "keep");

        expect(b.length).toBe(2);
        expect(b[0].length).toBe(2);

        expect(c).toEqual([
            [4, 2],
            [2, 1]
        ]);

        const b00 = b[0][0] as number[];
        const b01 = b[0][1] as number[];
        const b10 = b[1][0] as number[];
        const b11 = b[1][1] as number[];

        expect(b00).toEqual(expect.arrayContaining([1, 2, 4, 5]));
        expect(b01).toEqual(expect.arrayContaining([3, 6]));
        expect(b10).toEqual(expect.arrayContaining([7, 8]));
        expect(b11).toEqual(expect.arrayContaining([9]));
    });

    test('discard mode edge subimages', () => {
        const aData: ImageData2D = [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25]
        ];

        const aMask: MaskData = Array(5).fill(null).map(() => Array(5).fill(false)) as MaskData;

        const { b, c } = makeSubimages(aData, aMask, 3, 3, "discard");

        expect(b.length).toBe(1);
        expect((b[0] as number[][]).length).toBe(1);
        expect((b[0][0] as number[]).length).toBe(9);

        expect(c).toEqual([[9]]);

        const sorted = [...(b[0][0] as number[])].sort((a, b) => a - b);
        expect(sorted).toEqual([1, 2, 3, 6, 7, 8, 11, 12, 13]);
    });

    test('all masked values', () => {
        const aData: ImageData2D = [
            [1, 2],
            [3, 4]
        ];

        const aMask: MaskData = [
            [true, true],
            [true, true]
        ];

        const { b, c } = makeSubimages(aData, aMask, 2, 2, "pad");

        expect(b.length).toBe(1);
        expect((b[0] as number[][]).length).toBe(1);
        expect((b[0][0] as number[]).length).toBe(4);

        expect(c).toEqual([[0]]);

        const subImage = b[0][0] as number[];
        expect(subImage.every(val => Number.isNaN(val))).toBe(true);
    });

    test('no masked values', () => {
        const aData: ImageData2D = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ];

        const aMask: MaskData = Array(4).fill(null).map(() => Array(4).fill(false)) as MaskData;

        const { b, c } = makeSubimages(aData, aMask, 2, 2, "pad");

        expect(c).toEqual([
            [4, 4],
            [4, 4]
        ]);

        expect(b[0][0]).toEqual([1, 2, 5, 6]);
        expect(b[0][1]).toEqual([3, 4, 7, 8]);
        expect(b[1][0]).toEqual([9, 10, 13, 14]);
        expect(b[1][1]).toEqual([11, 12, 15, 16]);
    });
});