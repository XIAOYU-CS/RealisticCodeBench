import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class Answer {
    public static <T extends Map<String, ?>> List<T> sortByTimestamp(List<T> array) {
        array.sort((a, b) -> Long.compare(toMillis(a.get("timestamp")), toMillis(b.get("timestamp"))));
        return array;
    }

    private static long toMillis(Object timestamp) {
        String value = String.valueOf(timestamp);
        try {
            return Instant.parse(value).toEpochMilli();
        } catch (DateTimeParseException ignored) {
            return Date.parse(value);
        }
    }
}
