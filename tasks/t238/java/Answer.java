package org.real.temp;

import java.util.HashMap;
import java.util.Map;

public class Answer {
    @SuppressWarnings("unchecked")
    public static Map<String, Object> mergeObjectsDeeply(Map<String, Object> obj1, Map<String, Object> obj2) {
        if (obj2 == null) {
            return obj1;
        }

        Map<String, Object> output = new HashMap<>(obj2);
        for (Map.Entry<String, Object> entry : obj1.entrySet()) {
            String key = entry.getKey();
            Object value1 = entry.getValue();
            Object value2 = obj2.get(key);

            if (value1 instanceof Map && value2 instanceof Map) {
                output.put(key, mergeObjectsDeeply((Map<String, Object>) value1, (Map<String, Object>) value2));
            } else {
                output.put(key, value1);
            }
        }
        return output;
    }
}
