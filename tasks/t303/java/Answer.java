package org.real.temp;

import java.util.*;
import java.util.function.Function;

public class Answer {

    /**
     * Recursively converts string representations of numbers in a data structure to numeric types,
     * supporting custom conversion rules.
     *
     * @param data             Input data (nested Map, List, or other basic types)
     * @param customConverters A list of custom converter functions
     * @return The data structure after conversion
     */
    public static Object convertStringsToNumbers(Object data, List<Function<String, Object>> customConverters) {
        if (data instanceof Map) {
            Map<?, ?> map = (Map<?, ?>) data;
            Map<Object, Object> resultMap = new HashMap<>();
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                resultMap.put(entry.getKey(), convertStringsToNumbers(entry.getValue(), customConverters));
            }
            return resultMap;
        }
        else if (data instanceof List) {
            List<?> list = (List<?>) data;
            List<Object> resultList = new ArrayList<>();
            for (Object item : list) {
                resultList.add(convertStringsToNumbers(item, customConverters));
            }
            return resultList;
        }
        else if (data instanceof String) {
            String str = (String) data;
            if (customConverters != null) {
                Object converted = str;
                for (Function<String, Object> converter : customConverters) {
                    converted = converter.apply((String) converted);
                    if (!(converted instanceof String)) {
                        return converted;
                    }
                }
                str = (String) converted;
            }

            try {
                return Integer.parseInt(str);
            } catch (NumberFormatException e1) {
                try {
                    return Double.parseDouble(str);
                } catch (NumberFormatException e2) {
                    return str;
                }
            }
        }
        else {
            return data;
        }
    }

    public static Object convertStringsToNumbers(Object data) {
        return convertStringsToNumbers(data, null);
    }
}
