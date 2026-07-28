package org.real.temp;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;


public class Answer  {
    /**
     * Parses a key-value formatted file, converting each line into an entry of (processed key, processed value)
     * and returning them as a list. Empty lines are skipped.
     *
     * @param filePath       Path to the file to be parsed
     * @param keyProcessor   Function used to process keys, returns original key by default
     * @param valueProcessor Function used to process values, returns original value by default
     * @param separator      Delimiter for key-value pairs. Uses whitespace when null (splits into max two parts)
     * @return List of entries containing (processed key, processed value)
     * @throws IOException If an I/O error occurs reading the file
     */
    public static List<Map.Entry<String, String>> parseKeyValueFormatDataFile(
            String filePath) throws IOException {
        return parseKeyValueFormatDataFile(filePath, Function.identity(), Function.identity(), null);
    }

    @SuppressWarnings("unchecked")
    public static <K, V> List<Map.Entry<K, V>> parseKeyValueFormatDataFile(
            String filePath,
            Function<String, K> keyProcessor,
            Function<String, V> valueProcessor,
            String separator) throws IOException {

        if (keyProcessor == null) {
            keyProcessor = key -> (K) key;
        }
        if (valueProcessor == null) {
            valueProcessor = value -> (V) value;
        }

        List<Map.Entry<K, V>> results = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            int lineNumber = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;
                String trimmedLine = line.trim();

                // 跳过空行
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                String[] parts;
                if (separator == null) {
                    // 按空白字符分割，最多分成两部分
                    parts = trimmedLine.split("\\s+", 2);
                } else {
                    if (separator.isEmpty()) {
                        throw new IOException("empty separator");
                    }
                    // 按指定分隔符分割，最多分成两部分
                    parts = trimmedLine.split(java.util.regex.Pattern.quote(separator), 2);
                }

                // 验证格式
                if (parts.length != 2) {
                    throw new IOException(String.format(
                            "Line %d format error: must contain key and value (content: %s)",
                            lineNumber, trimmedLine));
                }

                try {
                    K key = keyProcessor.apply(parts[0]);
                    V value = valueProcessor.apply(parts[1]);
                    results.add(new AbstractMap.SimpleEntry<>(key, value));
                } catch (Exception e) {
                    throw new IOException(String.format(
                            "Line %d processing failed: %s (content: %s)",
                            lineNumber, e.getMessage(), trimmedLine), e);
                }
            }
        }

        return results;
    }
}
