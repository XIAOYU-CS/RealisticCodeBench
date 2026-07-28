/**
 * 2D array of numbers representing image data
 */
type ImageData2D = number[][];

/**
 * 2D array of booleans representing mask data
 * true indicates the corresponding position is masked
 */
type MaskData = boolean[][];

/**
 * Edge handling modes for sub-image processing
 */
type EdgeMode = 'pad' | 'keep' | 'discard';

/**
 * Return type for makeSubimages function
 */
interface SubimagesResult {
  /**
   * 3D array (or 2D object array for "keep" mode) containing flattened sub-images
   * For "keep" mode: b[i][j] is an array of unmasked values
   * For other modes: b[i][j] is a fixed-size array with valid values at the beginning
   */
  b: (number[] | number[][])[] | (number[] | null)[][];

  /**
   * 2D array recording the count of unmasked values in each sub-image
   */
  c: number[][];
}

/**
 * Divide input 2D image data and mask into sub-images, and flexibly handle edge parts.
 *
 * @param aData - 2D image data (raw values without mask)
 * @param aMask - 2D mask data (true indicates the corresponding position is masked)
 * @param backSizeX - Sub-image size along the row direction
 * @param backSizeY - Sub-image size along the column direction
 * @param edgeMode - Edge sub-image processing method:
 *   - "pad": Pad sub-images with insufficient dimensions (default)
 *   - "keep": Keep the original dimensions of edge sub-images (may be smaller than backSizeX/backSizeY)
 *   - "discard": Directly discard sub-images with insufficient dimensions
 * @param padValue - Padding value when edgeMode is "pad", default is NaN
 * @returns Object containing:
 *   - b: 3D array (or 2D object array for "keep" mode), each sub-image stored after flattening
 *   - c: 2D array, records the count of unmasked values in each sub-image
 */
function makeSubimages(
  aData: ImageData2D,
  aMask: MaskData,
  backSizeX: number,
  backSizeY: number,
  edgeMode: EdgeMode = "pad",
  padValue: number = NaN
): SubimagesResult {}