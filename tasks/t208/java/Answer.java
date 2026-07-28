package org.real.temp;

import java.util.Base64;

public class Answer {
    public static byte[] convertBase64ToArrayBuffer(String base64) {
        return Base64.getDecoder().decode(base64);
    }
}
