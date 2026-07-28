import { Jimp } from 'jimp';

async function imageTo1bitBinaryList(imagePath: string): Promise<number[]> {
  /**
   * Convert a picture to an array of binary bits. Convert it to black and white mode (only 0s and 1s, corresponding to black and white),
   * convert the white pixel (value 255) to 1, convert the black pixel to 0, and finally store these bits in an array and return.
   *
   * @param imagePath - The path to the image file.
   * @returns A promise that resolves with a list of bits (0 or 1) representing the image.
   */

  try {
    const image = await Jimp.read(imagePath);
    const bitArray: number[] = [];

    for (let y = 0; y < image.bitmap.height; y++) {
      for (let x = 0; x < image.bitmap.width; x++) {
        const rgba = image.getPixelColor(x, y);
        const red = (rgba >> 24) & 0xff;
        bitArray.push(red === 255 ? 1 : 0);
      }
    }

    return bitArray;
  } catch (error) {
    throw new Error(`Error converting image to bits: ${error}`);
  }
}
