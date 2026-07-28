package org.real.temp;

import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class Answer {

    /**
     * Extract the file ID from the given URL query args.
     *
     * @param url - The URL from which the file ID is to be extracted.
     * @return - The extracted file ID if present, otherwise null if the URL does not conform to the expected format.
     */
    public static String parseFileIdFromUrl(String url) {
        try {
            URL urlObject = new URL(url);
            String query = urlObject.getQuery();
            if (query == null) {
                return null;
            }

            for (String pair : query.split("&")) {
                int idx = pair.indexOf("=");
                if (idx <= 0) {
                    continue;
                }
                String key = URLDecoder.decode(pair.substring(0, idx), StandardCharsets.UTF_8);
                if ("fileId".equals(key)) {
                    String value = URLDecoder.decode(pair.substring(idx + 1), StandardCharsets.UTF_8);
                    return value.isEmpty() ? null : value;
                }
            }

            return null; // Return null if the file ID is missing
        } catch (Exception e) {
            System.err.println("Invalid URL: " + e);
            return null; // Return null if the URL is invalid or an error occurs.
        }
    }
}
