package org.real.temp;

import java.nio.charset.Charset;
import java.nio.charset.CharacterCodingException;
import java.nio.charset.CharsetEncoder;

public class Answer {

    public static void main(String[] args) {
        char[] uniqueToShiftJis = findShiftJisNotGbk();
        for (char character : uniqueToShiftJis) {
            System.out.println(character);
        }
    }

    public static char[] findShiftJisNotGbk() {
        // List to store characters that are in Shift-JIS but not in GBK
        char[] uniqueToShiftJis = new char[65536];
        int count = 0;

        // Iterate over a range of Unicode code points
        // The BMP goes up to U+FFFF, which is 65535 in decimal
        for (int codepoint = 0; codepoint < 65536; codepoint++) {
            char character = (char) codepoint;

            try {
                // Try encoding the character in Shift-JIS
                if (isEncodable(character, "Shift_JIS")) {
                    try {
                        // Try encoding the character in GBK
                        if (!isEncodable(character, "GBK")) {
                            // If it fails, the character is not representable in GBK but is in Shift-JIS
                            uniqueToShiftJis[count++] = character;
                        }
                    } catch (CharacterCodingException e) {
                        // If it fails, the character is not representable in GBK but is in Shift-JIS
                        uniqueToShiftJis[count++] = character;
                    }
                }
            } catch (CharacterCodingException e) {
                // If it fails, the character is not representable in Shift-JIS, so we skip it
                continue;
            }
        }

        // Trim the array to the actual size
        return java.util.Arrays.copyOf(uniqueToShiftJis, count);
    }

    private static boolean isEncodable(char character, String charsetName) throws CharacterCodingException {
        CharsetEncoder encoder = Charset.forName(charsetName).newEncoder();
        return encoder.canEncode(character);
    }
}
