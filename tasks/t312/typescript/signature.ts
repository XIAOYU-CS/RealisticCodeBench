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
): number | number[] {}