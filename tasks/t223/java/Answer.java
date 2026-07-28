import java.util.Base64;

public class Answer {
    public static String convertUint8ArrayToBase64(byte[] uint8Array) {
        return Base64.getEncoder().encodeToString(uint8Array);
    }
}
