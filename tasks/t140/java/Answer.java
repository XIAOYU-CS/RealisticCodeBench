package org.real.temp;

import org.jsoup.parser.Parser;

public class Answer {
    /**
     * Decodes HTML entities in a given HTML string.
     * @param htmlString The HTML string containing entities to decode.
     * @return The decoded string with HTML entities converted back to their original characters.
     */
    public static String decodeHtmlEntities(String htmlString) {
        if (htmlString == null) {
            throw new IllegalArgumentException("Input must be a string.");
        }

        return Parser.unescapeEntities(htmlString, false);
    }
}
