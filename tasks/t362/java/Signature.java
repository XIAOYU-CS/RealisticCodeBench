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
public static String replaceUrlPlaceholders(String url, Map<String, Object> params, String style, boolean encode) {}