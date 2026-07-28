import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { Jimp as TestJimp, JimpMime, rgbaToInt } from 'jimp';
describe('TestimageTo1bitBinaryList', () => {
    /**
     * Helper method to create an in-memory image.
     *
     * @param {string} mode - The color mode of the image (e.g., '1' for binary, 'L' for grayscale).
     * @param {number[]} size - A tuple of the image size (width, height).
     * @param {number | number[]} color - The color to fill the image. 255 for white, 0 for black in '1' mode.
     * @returns {Promise<Jimp>} A Jimp Image object.
     */
    function createImage(size: [number, number], color: number) {
        return new TestJimp({ width: size[0], height: size[1], color });
    }

    async function withImagePath(image: ReturnType<typeof createImage>, run: (imagePath: string) => Promise<number[]>) {
        const file = path.join(os.tmpdir(), `t73-${Date.now()}-${Math.random()}.png`);
        await fs.writeFile(file, await image.getBuffer(JimpMime.png));
        try {
            return await run(file);
        } finally {
            await fs.unlink(file);
        }
    }

    describe('test_all_white_image', () => {
        it('should convert an all-white image to bits', async () => {
            const image = createImage([4, 4], rgbaToInt(255, 255, 255, 255));
            const result = await withImagePath(image, imageTo1bitBinaryList);
            const expectedBits = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            expect(result).toEqual(expectedBits);
        });
    });

    describe('test_all_black_image', () => {
        it('should convert an all-black image to bits', async () => {
            const image = createImage([4, 4], rgbaToInt(0, 0, 0, 255));
            const result = await withImagePath(image, imageTo1bitBinaryList);
            const expectedBits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            expect(result).toEqual(expectedBits);
        });
    });

    describe('test_checkerboard_image', () => {
        it('should convert a checkerboard image to bits', async () => {
            const image = createImage([4, 4], rgbaToInt(0, 0, 0, 255));
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if ((x + y) % 2 === 0) {
                        image.setPixelColor(rgbaToInt(255, 255, 255, 255), x, y);
                    }
                }
            }
            const result = await withImagePath(image, imageTo1bitBinaryList);
            const expectedBits = [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1];
            expect(result).toEqual(expectedBits);
        });
    });

    describe('test_horizontal_stripes_image', () => {
        it('should convert a horizontal stripes image to bits', async () => {
            const image = createImage([4, 4], rgbaToInt(0, 0, 0, 255));
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if (y % 2 === 0) {
                        image.setPixelColor(rgbaToInt(255, 255, 255, 255), x, y);
                    }
                }
            }
            const result = await withImagePath(image, imageTo1bitBinaryList);
            const expectedBits = [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0];
            expect(result).toEqual(expectedBits);
        });
    });

    describe('test_vertical_stripes_image', () => {
        it('should convert a vertical stripes image to bits', async () => {
            const image = createImage([4, 4], rgbaToInt(0, 0, 0, 255));
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    if (x % 2 === 0) {
                        image.setPixelColor(rgbaToInt(255, 255, 255, 255), x, y);
                    }
                }
            }
            const result = await withImagePath(image, imageTo1bitBinaryList);
            const expectedBits = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
            expect(result).toEqual(expectedBits);
        });
    });
});
