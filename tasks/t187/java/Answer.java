import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class Answer {
    public static String convertToBase64(String input) {
        return Base64.getEncoder().encodeToString(input.getBytes(StandardCharsets.UTF_8));
    }
}
