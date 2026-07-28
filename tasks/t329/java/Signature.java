public static class SubimageResult {
    public final Object[][] b;  // 3D array for pad/discard mode, 2D object array for keep mode
    public final int[][] c;     // Count array
    public final String edgeMode;

    public SubimageResult(Object[][] b, int[][] c, String edgeMode) {
        this.b = b;
        this.c = c;
        this.edgeMode = edgeMode;
    }
}
/**
* Divide input 2D image data and mask into sub-images, and flexibly handle edge parts.
*
* @param aData 2D image data (raw values without mask).
* @param aMask 2D mask data (True indicates the corresponding position is masked).
* @param backSizeX Sub-image size along the row direction.
* @param backSizeY Sub-image size along the column direction.
* @param edgeMode Edge sub-image processing method:
*                 - "pad": Pad sub-images with insufficient dimensions (default);
*                 - "keep": Keep the original dimensions of edge sub-images;
*                 - "discard": Directly discard sub-images with insufficient dimensions.
* @param padValue Padding value when edge_mode is "pad", default is Double.NaN.
* @return SubimageResult containing processed sub-images and counts.
*/
public static SubimageResult makeSubimages(double[][] aData, boolean[][] aMask,
                                        int backSizeX, int backSizeY,
                                        String edgeMode, double padValue) {}