/**
 * @brief Replace placeholders in URL string with actual parameter values, supporting multiple
 * placeholder formats and URL encoding.
 * 
 * @param url URL string containing placeholders
 * @param params Dictionary containing placeholder names and corresponding values
 * @param style Placeholder style, options: curly({}), square([]), angle(<>),
 *              percent(%), colon(:). Default is "curly"
 * @param encode Whether to URL encode parameter values (useful for query parameters).
 *               Default is false
 * @return std::string URL string with placeholders replaced by actual values
 * @throws std::invalid_argument When an unsupported placeholder style is provided
 */
std::string replace_url_placeholders(
    std::string url,
    const std::map<std::string, std::string>& params,
    std::string style = "curly",
    bool encode = false
);
