/**
* Replace values in some_arr based on the nearest non-zero values in rms (or custom mask condition).
*
* @param someArr A 2D array whose values will be replaced where maskFunc(rms) is true.
* @param rms A 2D array of the same shape as someArr. Nearest non-masked neighbors
*            (where maskFunc(rms) is false) determine the replacement indices for someArr.
* @param maskFunc A function that takes `rms` as input and returns a boolean 2D array.
*                 Positions where the result is true will be replaced.
*                 Defaults to `x -> x == 0`.
* @return A copy of someArr with values replaced based on nearest non-masked neighbors.
* @throws IllegalArgumentException If arrays have different shapes or are not 2D.
*/
public static double[][] replaceByNearest(double[][] someArr, double[][] rms, MaskFunction maskFunc) {}