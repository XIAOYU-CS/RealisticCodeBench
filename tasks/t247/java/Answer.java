package org.real.temp;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class Answer {

    /**
     * Removes the specified parameter from the URL query string.
     *
     * @param url The URL from which to remove the parameter.
     * @param key The key of the parameter to remove.
     * @return The modified URL with the specified parameter removed.
     * @throws URISyntaxException If the URL is malformed.
     */
    public static String removeQueryParam(String url, String key) throws URISyntaxException {
        URI uri = new URI(url);
        String query = uri.getRawQuery();
        StringBuilder newQuery = new StringBuilder();

        if (query != null && !query.isEmpty()) {
            String[] pairs = query.split("&");
            for (String pair : pairs) {
                if (pair.isEmpty()) {
                    continue;
                }
                int idx = pair.indexOf("=");
                String rawKey = idx >= 0 ? pair.substring(0, idx) : pair;
                String paramKey = URLDecoder.decode(rawKey, StandardCharsets.UTF_8);

                if (!paramKey.equals(key)) {
                    String rawValue = idx >= 0 ? pair.substring(idx + 1) : "";
                    String paramValue = URLDecoder.decode(rawValue, StandardCharsets.UTF_8);
                    if (newQuery.length() > 0) {
                        newQuery.append("&");
                    }
                    newQuery.append(URLEncoder.encode(paramKey, StandardCharsets.UTF_8));
                    newQuery.append("=");
                    newQuery.append(URLEncoder.encode(paramValue, StandardCharsets.UTF_8));
                }
            }
        }

        StringBuilder result = new StringBuilder();
        if (uri.getScheme() != null) {
            result.append(uri.getScheme()).append(":");
        }
        if (uri.getRawAuthority() != null) {
            result.append("//").append(uri.getRawAuthority());
        }
        String path = uri.getRawPath();
        if (uri.getRawAuthority() != null && (path == null || path.isEmpty())) {
            path = "/";
        }
        if (path != null) {
            result.append(path);
        }
        if (newQuery.length() > 0) {
            result.append("?").append(newQuery);
        }
        if (uri.getRawFragment() != null) {
            result.append("#").append(uri.getRawFragment());
        }
        return result.toString();
    }

    public static void main(String[] args) {
        try {
            String modifiedUrl = removeQueryParam("http://example.com?param1=value1&param2=value2", "param1");
            System.out.println(modifiedUrl);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
