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
): SubimagesResult {
  // Get original image dimensions (rows and columns)
  const k: number = aData.length;
  const l: number = aData[0].length;

  let p: number, r: number; // Number of sub-images in row and column directions

  // Calculate number of sub-images based on edge handling mode
  if (edgeMode === "discard") {
    // Discard edges: only count complete sub-images
    p = Math.floor(k / backSizeX);
    r = Math.floor(l / backSizeY);
  } else {
    // Keep edges: include partial sub-images by rounding up
    p = Math.ceil(k / backSizeX);
    r = Math.ceil(l / backSizeY);
  }

  // Initialize output arrays based on edge handling mode
  let b: (number[] | number[][])[] | (number[] | null)[][];
  if (edgeMode === "keep") {
    // For "keep" mode, use object array since sub-images may have different sizes
    b = Array.from({ length: p }, () => Array(r).fill(null));
  } else {
    // For "pad" or "discard" mode, sub-images have fixed size
    b = Array.from({ length: p }, () =>
      Array.from({ length: r }, () => Array(backSizeX * backSizeY).fill(NaN))
    );
  }

  // Initialize count array to record number of valid pixels in each sub-image
  const c: number[][] = Array.from({ length: p }, () => Array(r).fill(0));

  // Iterate over all sub-image positions
  for (let i = 0; i < p; i++) {
    for (let j = 0; j < r; j++) {
      // Calculate coordinate range for current sub-image in original image
      const startX: number = i * backSizeX;
      const endX: number = Math.min(startX + backSizeX, k); // Ensure we don't exceed image bounds
      const startY: number = j * backSizeY;
      const endY: number = Math.min(startY + backSizeY, l); // Ensure we don't exceed image bounds

      // Extract sub-image data and mask (may be smaller than requested size at edges)
      let subData: number[][] = [];
      let subMask: boolean[][] = [];

      // Copy data from original image to sub-image
      for (let x = startX; x < endX; x++) {
        const row: number[] = [];
        const maskRow: boolean[] = [];
        for (let y = startY; y < endY; y++) {
          row.push(aData[x][y]);
          maskRow.push(aMask[x][y]);
        }
        subData.push(row);
        subMask.push(maskRow);
      }

      // Get actual dimensions of extracted sub-image
      let currentShape: [number, number] = [subData.length, subData[0]?.length || 0];

      // Handle edge sub-images that need padding
      if (edgeMode === "pad" && (currentShape[0] < backSizeX || currentShape[1] < backSizeY)) {
        // Calculate padding needed in both dimensions
        const padX: number = backSizeX - currentShape[0];
        const padY: number = backSizeY - currentShape[1];

        // Pad rows (extend vertically)
        for (let x = 0; x < padX; x++) {
          subData.push(Array(backSizeY).fill(padValue));
          subMask.push(Array(backSizeY).fill(true)); // Treat padded areas as masked
        }

        // Pad columns (extend horizontally)
        for (let row of subData) {
          row.push(...Array(padY).fill(padValue));
        }

        for (let row of subMask) {
          row.push(...Array(padY).fill(true)); // Treat padded areas as masked
        }

        // Update shape to reflect padded dimensions
        currentShape = [backSizeX, backSizeY];
      }

      // Flatten sub-image data and mask for processing
      const flatData: number[] = subData.flat();
      const flatMask: boolean[] = subMask.flat();

      // Extract only unmasked values from sub-image
      const unmaskedValues: number[] = flatData.filter((_, idx) => !flatMask[idx]);

      // Count valid (unmasked) pixels
      const count: number = unmaskedValues.length;
      c[i][j] = count;

      // Store results based on edge handling mode
      if (edgeMode === "keep") {
        // Keep original dimensions, store flattened valid pixels directly
        (b as (number[] | null)[][])[i][j] = unmaskedValues;
      } else {
        // For "pad" or "discard" mode, store in fixed-size array
        for (let idx = 0; idx < count; idx++) {
          ((b as number[][][])[i][j] as number[])[idx] = unmaskedValues[idx];
        }
      }
    }
  }

  // Return processed sub-images and count array
  return { b, c };
}