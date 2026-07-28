type PlaceholderStyle = 'curly' | 'square' | 'angle' | 'percent' | 'colon';
interface ReplaceUrlPlaceholdersOptions {
    style?: PlaceholderStyle;
    encode?: boolean;
}
/**
 * Replace placeholders in URL string with actual parameter values, supporting multiple
 * placeholder formats and URL encoding.
 *
 * @param url - URL string containing placeholders
 * @param params - Object containing placeholder names and corresponding values
 * @param style - Placeholder style, options: curly({}), square([]), angle(<>),
 *                percent(%), colon(:). Default is "curly"
 * @param encode - Whether to URL encode parameter values (useful for query parameters).
 *                Default is false
 * @returns URL string with placeholders replaced by actual values
 * @throws Error when an unsupported placeholder style is provided
 */
function replaceUrlPlaceholders(
    url: string,
    params: Record<string, any>,
    style: 'curly' | 'square' | 'angle' | 'percent' | 'colon' = 'curly',
    encode: boolean = false
): string {}