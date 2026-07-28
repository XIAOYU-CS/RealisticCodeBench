package org.real.temp;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class Answer {
    public static String arrayBufferToUtf8String(ByteBuffer buffer) {
        return StandardCharsets.UTF_8.decode(buffer.asReadOnlyBuffer()).toString();
    }
}
