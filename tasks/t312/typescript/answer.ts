/**
 * Enhanced 3D linear interpolation (trilinear interpolation), supporting batch processing and boundary handling
 *
 * @param points - 3D point coordinates to interpolate, can be single point or batch points
 *                 Format: [x, y, z] or N×3 array
 * @param voxelMin - Minimum vertex coordinates of the voxel [x_min, y_min, z_min]
 * @param voxelMax - Maximum vertex coordinates of the voxel [x_max, y_max, z_max]
 * @param voxelValues - Values of the 8 voxel vertices, in order:
 *                      [x_min,y_min,z_min], [x_max,y_min,z_min],
 *                      [x_min,y_max,z_min], [x_max,y_max,z_min],
 *                      [x_min,y_min,z_max], [x_max,y_min,z_max],
 *                      [x_min,y_max,z_max], [x_max,y_max,z_max]
 * @param boundsMode - Boundary handling mode:
 *                     - "clip": Clip out-of-bounds points to boundaries
 *                     - "fill": Return fill_value for out-of-bounds points
 *                     - "error": Raise exception for out-of-bounds points
 * @param fillValue - Fill value used when bounds_mode="fill"
 * @returns Interpolation results (single value or array)
 */
function trilinearInterp(
    points: number[] | number[][],
    voxelMin: number[],
    voxelMax: number[],
    voxelValues: number[],
    boundsMode: string = "clip",
    fillValue: number = 0.0
): number | number[] {
    // Unify data format
    let pointsArray: number[] | number[][];
    if (Array.isArray(points[0])) {
        pointsArray = points as number[][];
    } else {
        pointsArray = points as number[];
    }

    // Validate input validity
    const isSinglePoint = !Array.isArray(points[0]);
    if (isSinglePoint) {
        if ((pointsArray as number[]).length !== 3) {
            throw new Error("points must be a 3D point (1D array) or N×3 batch points (2D array)");
        }
    } else {
        if ((pointsArray as number[][]).length === 0 || (pointsArray as number[][])[0].length !== 3) {
            throw new Error("points must be a 3D point (1D array) or N×3 batch points (2D array)");
        }
    }

    if (voxelMin.length !== 3 || voxelMax.length !== 3) {
        throw new Error("voxel_min and voxel_max must be 3D coordinates");
    }

    if (voxelValues.length !== 8) {
        throw new Error("voxel_values must contain values for 8 vertices");
    }

    // Calculate voxel size, avoid division by zero
    const voxelSize = [
        voxelMax[0] - voxelMin[0],
        voxelMax[1] - voxelMin[1],
        voxelMax[2] - voxelMin[2]
    ];

    if (voxelSize.some(size => size <= 1e-9)) {
        throw new Error("Voxel size cannot be zero or negative");
    }

    // Process batch points (ensure 2D array format)
    let points2D: number[][];
    if (isSinglePoint) {
        points2D = [pointsArray as number[]]; // Convert to 1×3 array
    } else {
        points2D = pointsArray as number[][];
    }

    // Calculate relative weights (x, y, z directions)
    const weights: number[][] = points2D.map(point => [
        (point[0] - voxelMin[0]) / voxelSize[0],
        (point[1] - voxelMin[1]) / voxelSize[1],
        (point[2] - voxelMin[2]) / voxelSize[2]
    ]);

    // Boundary handling
    let outOfBounds: boolean[] = new Array(points2D.length).fill(false);
    if (boundsMode === "clip") {
        for (let i = 0; i < weights.length; i++) {
            weights[i] = weights[i].map(w => Math.max(0.0, Math.min(1.0, w)));
        }
    } else if (boundsMode === "fill") {
        // Check for out-of-bounds points
        outOfBounds = weights.map(weight =>
            weight.some(w => w < 0.0 || w > 1.0)
        );
    } else if (boundsMode === "error") {
        const hasOutOfBounds = weights.some(weight =>
            weight.some(w => w < 0.0 || w > 1.0)
        );
        if (hasOutOfBounds) {
            throw new Error("Points exist outside the voxel range");
        }
    } else {
        throw new Error(`Unsupported boundary mode: ${boundsMode}`);
    }

    // Extract 8 vertex values
    const [v000, v100, v010, v110, v001, v101, v011, v111] = voxelValues;

    // Step 1: X-direction interpolation (batch processing)
    const xw = weights.map(w => w[0]); // X-direction weights
    const c00 = xw.map((wx, i) => v000 * (1 - wx) + v100 * wx); // Bottom face, back edge
    const c01 = xw.map((wx, i) => v010 * (1 - wx) + v110 * wx); // Bottom face, front edge
    const c10 = xw.map((wx, i) => v001 * (1 - wx) + v101 * wx); // Top face, back edge
    const c11 = xw.map((wx, i) => v011 * (1 - wx) + v111 * wx); // Top face, front edge

    // Step 2: Y-direction interpolation
    const yw = weights.map(w => w[1]); // Y-direction weights
    const c0 = yw.map((wy, i) => c00[i] * (1 - wy) + c01[i] * wy); // Bottom face interpolation
    const c1 = yw.map((wy, i) => c10[i] * (1 - wy) + c11[i] * wy); // Top face interpolation

    // Step 3: Z-direction interpolation
    const zw = weights.map(w => w[2]); // Z-direction weights
    let result = zw.map((wz, i) => c0[i] * (1 - wz) + c1[i] * wz);

    // Apply fill value to out-of-bounds points
    if (boundsMode === "fill") {
        for (let i = 0; i < result.length; i++) {
            if (outOfBounds[i]) {
                result[i] = fillValue;
            }
        }
    }

    // Restore single point output format
    return isSinglePoint ? result[0] : result;
}