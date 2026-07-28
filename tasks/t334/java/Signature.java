/**
 * Convert the OPC raw data into a list of pixel colors
 *
 * @param data Raw byte data
 * @param format Color format, supporting 'rgb' (default), 'rgba', 'grb', 'bgr'
 * @param normalize Whether to normalize values ranging from 0 to 255 to the range of 0.0 to 1.0
 * @return A list of color tuples, with each tuple representing the color of a pixel
 */
public static List<Object> opcDataToPixels(byte[] data, String format, boolean normalize) {}