package org.real.temp;

public class Answer {

    /**
     * Move the emoji expressions in the string to the end of the text.
     *
     * @param text The input string containing text and possibly emojis.
     * @return The modified string with all emojis moved to the end.
     */
    public static String shiftEmojisToTextEnd(String text) {
        StringBuilder textWithoutEmojis = new StringBuilder();
        StringBuilder emojis = new StringBuilder();

        for (int i = 0; i < text.length(); ) {
            int codePoint = text.codePointAt(i);
            if (isEmoji(codePoint)) {
                emojis.appendCodePoint(codePoint);
            } else {
                textWithoutEmojis.appendCodePoint(codePoint);
            }
            i += Character.charCount(codePoint);
        }

        return textWithoutEmojis.toString() + emojis.toString();
    }

    private static boolean isEmoji(int codePoint) {
        return (codePoint >= 0x1F600 && codePoint <= 0x1F64F)
            || (codePoint >= 0x1F300 && codePoint <= 0x1F5FF)
            || (codePoint >= 0x1F680 && codePoint <= 0x1F6FF)
            || (codePoint >= 0x1F700 && codePoint <= 0x1F77F)
            || (codePoint >= 0x1F780 && codePoint <= 0x1F7FF)
            || (codePoint >= 0x1F800 && codePoint <= 0x1F8FF)
            || (codePoint >= 0x1F900 && codePoint <= 0x1F9FF)
            || (codePoint >= 0x1FA00 && codePoint <= 0x1FA6F)
            || (codePoint >= 0x1FA70 && codePoint <= 0x1FAFF)
            || (codePoint >= 0x2702 && codePoint <= 0x27B0)
            || (codePoint >= 0x24C2 && codePoint <= 0x1F251);
    }
}
