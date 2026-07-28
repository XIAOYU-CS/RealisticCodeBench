package org.real.temp;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Answer {

    /**
     * Replace placeholders in URL string with actual parameter values, supporting multiple
     * placeholder formats and URL encoding.
     *
     * @param url URL string containing placeholders
     * @param params Dictionary containing placeholder names and corresponding values
     * @param style Placeholder style, options: curly({}), square([]), angle(<>),
     *              percent(%), colon(:). Default is "curly"
     * @param encode Whether to URL encode parameter values (useful for query parameters).
     *               Default is false
     * @return URL string with placeholders replaced by actual values
     * @throws IllegalArgumentException When an unsupported placeholder style is provided
     */
    public static String replaceUrlPlaceholders(String url, Map<String, Object> params, String style, boolean encode) {
        String resultUrl = url;

        // Validate placeholder style
        String[] validStyles = {"curly", "square", "angle", "percent", "colon"};
        boolean isValidStyle = false;
        for (String validStyle : validStyles) {
            if (validStyle.equals(style)) {
                isValidStyle = true;
                break;
            }
        }
        if (!isValidStyle) {
            throw new IllegalArgumentException("Unsupported placeholder style: " + style + ". " +
                    "Supported styles: " + String.join(", ", validStyles));
        }

        // Track original placeholders for warning detection
        Set<String> originalPlaceholders = new HashSet<>();

        // Iterate through parameter dictionary and replace each placeholder
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            String placeholder = entry.getKey();
            Object value = entry.getValue();

            // Select different placeholder formats based on style
            String placeholderStr;
            switch (style) {
                case "curly":
                    placeholderStr = "{" + placeholder + "}";
                    break;
                case "square":
                    placeholderStr = "[" + placeholder + "]";
                    break;
                case "angle":
                    placeholderStr = "<" + placeholder + ">";
                    break;
                case "percent":
                    placeholderStr = "%" + placeholder + "%";
                    break;
                case "colon":  // Commonly used in RESTful API, e.g., /user/:id
                    placeholderStr = ":" + placeholder;
                    break;
                default:
                    placeholderStr = "{" + placeholder + "}"; // fallback
            }

            // Add to tracking set
            originalPlaceholders.add(placeholderStr);

            // Process parameter value: convert to string, URL encode if needed
            String valueStr = String.valueOf(value);
            if (encode) {
                try {
                    valueStr = URLEncoder.encode(valueStr, StandardCharsets.UTF_8.toString());
                } catch (Exception e) {
                    // If encoding fails, use original value
                    valueStr = String.valueOf(value);
                }
            }

            // Replace placeholder
            resultUrl = resultUrl.replace(placeholderStr, valueStr);
        }

        // Check for remaining placeholders (warning simulation)
        String pattern;
        switch (style) {
            case "curly":
                pattern = "\\{([^}]+)\\}";
                break;
            case "square":
                pattern = "\\[([^\\]]+)\\]";
                break;
            case "angle":
                pattern = "<([^>]+)>";
                break;
            case "percent":
                pattern = "%([^%]+)%";
                break;
            case "colon":
                pattern = ":([^:/?#]+)";
                break;
            default:
                pattern = "\\{([^}]+)\\}";
        }

        Pattern regex = Pattern.compile(pattern);
        Matcher matcher = regex.matcher(resultUrl);
        StringBuilder remaining = new StringBuilder();
        boolean hasRemaining = false;
        while (matcher.find()) {
            if (hasRemaining) {
                remaining.append(", ");
            }
            remaining.append(matcher.group(1));
            hasRemaining = true;
        }

        if (hasRemaining) {
            System.out.println("WARNING: URL contains unreplaced placeholders: " + remaining.toString());
        }

        return resultUrl;
    }

    /**
     * Replace placeholders in URL string with default parameters (curly style, no encoding)
     *
     * @param url URL string containing placeholders
     * @param params Dictionary containing placeholder names and corresponding values
     * @return URL string with placeholders replaced by actual values
     */
    public static String replaceUrlPlaceholders(String url, Map<String, Object> params) {
        return replaceUrlPlaceholders(url, params, "curly", false);
    }

    /**
     * Replace placeholders in URL string with custom style and default encoding
     *
     * @param url URL string containing placeholders
     * @param params Dictionary containing placeholder names and corresponding values
     * @param style Placeholder style
     * @return URL string with placeholders replaced by actual values
     */
    public static String replaceUrlPlaceholders(String url, Map<String, Object> params, String style) {
        return replaceUrlPlaceholders(url, params, style, false);
    }
}