
class Frame {

    constructor(numKeypoints) {
        this.N = numKeypoints;
        this.mvuRight = new Array(numKeypoints).fill(-1.0);
        this.mvDepth = new Array(numKeypoints).fill(-1.0);
        this.mvKeys = [];
        this.mvKeysUn = [];
        this.mbf = 0.0;
    }

    /**
     * Compute stereo information from RGBD depth image
     * @param {Object} imDepth - Input depth image object with:
     *   - data: TypedArray containing depth values
     *   - width: Image width
     *   - height: Image height
     *   - type: Data type ('float32' or 'uint16')
     * @throws {Error} Throws error for empty image or unsupported types
     */
    computeStereoFromRGBD(imDepth) {
        if (!imDepth || !imDepth.data || imDepth.data.length === 0) {
            throw new Error("Input depth image is empty");
        }

        const supportedTypes = ['float32', 'uint16'];
        if (!supportedTypes.includes(imDepth.type)) {
            throw new Error(`Unsupported depth image type: ${imDepth.type}. Supported types: ${supportedTypes.join(', ')}`);
        }

        const isFloat = imDepth.type === 'float32';
        const depthRows = imDepth.height;
        const depthCols = imDepth.width;

        for (let i = 0; i < this.N; i++) {
            const kp = this.mvKeys[i];
            const kpU = this.mvKeysUn[i];

            if (!kp || !kpU) continue;

            const u = kp.pt.x;
            const v = kp.pt.y;

            const uInt = Math.round(u);
            const vInt = Math.round(v);

            if (uInt >= 0 && uInt < depthCols && vInt >= 0 && vInt < depthRows) {
                const index = vInt * depthCols + uInt;

                let d;
                if (isFloat) {
                    d = imDepth.data[index];
                } else {
                    d = imDepth.data[index] / 1000.0;
                }

                if (d > 0) {
                    this.mvDepth[i] = d;
                    this.mvuRight[i] = kpU.pt.x - (this.mbf / d);
                }
            }
        }
    }
}

function createKeypoint(x, y) {
    return { pt: { x, y } };
}