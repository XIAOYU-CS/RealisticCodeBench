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
): string {
    let resultUrl = url;

    // Validate placeholder style
    const validStyles: Array<'curly' | 'square' | 'angle' | 'percent' | 'colon'> =
        ['curly', 'square', 'angle', 'percent', 'colon'];
    if (!validStyles.includes(style)) {
        throw new Error(`Unsupported placeholder style: ${style}. Supported styles: ${validStyles.join(', ')}`);
    }

    // Iterate through parameter object and replace each placeholder
    for (const [placeholder, value] of Object.entries(params)) {
        let placeholderStr: string;

        // Select different placeholder formats based on style
        switch (style) {
            case 'curly':
                placeholderStr = `{${placeholder}}`;
                break;
            case 'square':
                placeholderStr = `[${placeholder}]`;
                break;
            case 'angle':
                placeholderStr = `<${placeholder}>`;
                break;
            case 'percent':
                placeholderStr = `%${placeholder}%`;
                break;
            case 'colon':  // Commonly used in RESTful API, e.g., /user/:id
                placeholderStr = `:${placeholder}`;
                break;
        }

        // Process parameter value: convert to string, URL encode if needed
        let valueStr = String(value);
        if (encode) {
            // JavaScript's encodeURIComponent is similar to Python's quote with safe=''
            valueStr = encodeURIComponent(valueStr);
        }

        // Replace placeholder
        resultUrl = resultUrl.split(placeholderStr).join(valueStr);
    }

    // Check for unreplaced placeholders (simple warning mechanism)
    let remaining: RegExpMatchArray | null = null;
    switch (style) {
        case 'curly':
            remaining = resultUrl.match(/\{(\w+)\}/g);
            break;
        case 'square':
            remaining = resultUrl.match(/\[(\w+)\]/g);
            break;
        case 'angle':
            remaining = resultUrl.match(/<(\w+)>/g);
            break;
        case 'percent':
            remaining = resultUrl.match(/%(\w+)%/g);
            break;
        case 'colon':
            remaining = resultUrl.match(/:(\w+)/g);
            break;
    }

    if (remaining && remaining.length > 0) {
        console.warn(`URL contains unreplaced placeholders: ${remaining.join(', ')}`);
    }

    return resultUrl;
}