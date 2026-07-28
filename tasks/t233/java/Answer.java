import java.util.Map;

public class Answer {
    public static boolean compareObjectsDepth(Object obj1, Object obj2) {
        if (!(obj1 instanceof Map<?, ?>) || !(obj2 instanceof Map<?, ?>)) {
            return false;
        }

        Map<?, ?> map1 = (Map<?, ?>) obj1;
        Map<?, ?> map2 = (Map<?, ?>) obj2;
        if (map1.size() != map2.size()) {
            return false;
        }

        for (Object key : map1.keySet()) {
            if (!map2.containsKey(key) || !compareObjectsDepth(map1.get(key), map2.get(key))) {
                return false;
            }
        }

        return true;
    }
}
