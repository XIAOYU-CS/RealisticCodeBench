/**
 * Check whether each row in data satisfies multiple XOR constraints.
 *
 * @param data 2D list with shape (N, C), where N is the number of rows and C is the number of columns.
 * @param xorGroups List of lists. Each sublist contains column indices to XOR, e.g., [[0,3,6], [1,4,7], [2,5]].
 * @param targetValues List of integers. Target XOR result for each group, e.g., [0x6b, 0x76, 0x12].
 * @return List of Boolean. A boolean list of length N, indicating whether each row satisfies all XOR constraints.
 */
public static List<Boolean> checkXorConstraints(List<List<Integer>> data,
                                                List<List<Integer>> xorGroups,
                                                List<Integer> targetValues) {}