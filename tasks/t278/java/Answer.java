package org.real.temp;

import java.util.Base64;

public class Answer {
    public static String base64Encode(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }
}
