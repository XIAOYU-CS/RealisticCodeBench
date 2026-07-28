package org.real.temp;

import java.nio.charset.Charset;
import java.nio.charset.CodingErrorAction;
import java.util.Arrays;

public class Answer {

    public static Object[] extractCharacterBits(byte[] byteArray, String charToFind, Charset charset) {

        try {
            // Convert byte array to string using specified charset
            String str = charset.newDecoder()
                    .onMalformedInput(CodingErrorAction.REPORT)
                    .onUnmappableCharacter(CodingErrorAction.REPORT)
                    .decode(java.nio.ByteBuffer.wrap(byteArray))
                    .toString();

            // Get index of character
            int charIndex = str.indexOf(charToFind);

            if(charIndex == -1) return null; // Character not found

            // Get bit representation of character
            int bytePosition = str.substring(0, charIndex).getBytes(charset).length;
            int charLength = charToFind.getBytes(charset).length;
            byte[] bits = Arrays.copyOfRange(byteArray, bytePosition, Math.min(byteArray.length, bytePosition + charLength));
            StringBuilder bitsAsString = new StringBuilder();
            for (byte bit : bits) {
                if (bitsAsString.length() > 0) bitsAsString.append(' ');
                bitsAsString.append(String.format("%8s", Integer.toBinaryString(bit & 0xff)).replace(' ', '0'));
            }

            return new Object[]{str.codePointCount(0, charIndex), bitsAsString.toString()};

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

}
