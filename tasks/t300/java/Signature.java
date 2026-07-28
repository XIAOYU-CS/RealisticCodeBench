/**
 * Parses a key-value formatted file, converting each line into an entry of (processed key, processed value)
 * and returning them as a list. Empty lines are skipped.
 *
 * @param filePath      Path to the file to be parsed
 * @param keyProcessor  Function used to process keys, returns original key by default
 * @param valueProcessor Function used to process values, returns original value by default
 * @param separator     Delimiter for key-value pairs. Uses whitespace when null (splits into max two parts)
 * @return List of entries containing (processed key, processed value)
 * @throws IOException If an I/O error occurs reading the file
 */
public static List<Map.Entry<Object, Object>> parseKeyValueFormatDataFile(
        String filePath,
        Function<String, Object> keyProcessor,
        Function<String, Object> valueProcessor,
        String separator) throws IOException {}