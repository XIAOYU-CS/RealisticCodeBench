import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class Answer {
    public static List<Map<String, Object>> sortByKey(List<Map<String, Object>> array, String key) {
        if (array == null || array.isEmpty()) {
            return new ArrayList<>();
        }

        List<Map<String, Object>> sorted = new ArrayList<>(array);
        sorted.sort(Comparator.comparing(item -> String.valueOf(item.getOrDefault(key, "")).toLowerCase(Locale.ROOT)));
        return sorted;
    }
}
