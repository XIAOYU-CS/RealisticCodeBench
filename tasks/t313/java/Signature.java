/**
* Generic N-dimensional linear interpolation function
*
* @param x Sampling point coordinates with shape (batch_size, dim)
* @param voxelMin Minimum vertex coordinates of the voxel with shape (batch_size, dim)
* @param voxelMax Maximum vertex coordinates of the voxel with shape (batch_size, dim)
* @param vertexEmbeds Voxel vertex features with shape (batch_size, 2^dim, num_features)
* @param dim Interpolation dimension (>=1)
* @return Interpolation result with shape (batch_size, num_features)
*/
public static double[][] nLinearInterp(double[][][] x, double[][][] voxelMin, double[][][] voxelMax,
                                        double[][][] vertexEmbeds, int dim) {}