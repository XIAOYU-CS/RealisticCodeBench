/**
 * @brief Convert the OPC raw data into a list of pixel colors
 * 
 * @param data Raw byte data
 * @param format Color format, supporting 'rgb' (default), 'rgba', 'grb', 'bgr'
 * @param normalize Whether to normalize values ranging from 0 to 255 to the range of 0.0 to 1.0
 * @return std::vector<std::tuple<float, float, float>> A list of color tuples, with each tuple representing the color of a pixel
 */
std::vector<std::tuple<float, float, float>> opc_data_to_pixels(const std::vector<uint8_t>& data, const std::string& format = "rgb", bool normalize = false);
