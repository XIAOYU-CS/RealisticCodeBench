/**
 * Reads frame data from a binary file, supporting custom frame structures and data types
 *
 * @param filePath        Path to the binary file
 * @param frameSpec       Frame structure description array containing two elements:
 *                        - elementsPerFrame: Number of elements in each frame (Integer)
 *                        - dataFormat: Format string following struct module conventions
 *                        (e.g., "<I" for little-endian 32-bit unsigned integer)
 * @param ignoreIncomplete Whether to ignore incomplete frames (false will warn, true will silently ignore)
 * @return List of frames, where each frame is a list containing the specified number of elements
 * @throws ValueError      If invalid parameters are provided
 * @throws FileNotFoundException If the specified file does not exist
 * @throws IOException     If an error occurs while reading the file
 */
public static List<List<Number>> readBinaryFrames(String filePath, Object[] frameSpec, boolean ignoreIncomplete)
        throws ValueError, FileNotFoundException, IOException {}