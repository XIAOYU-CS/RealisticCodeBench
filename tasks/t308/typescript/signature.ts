/**
 * Query minimization function supporting whitespace modes and custom comment rules
 *
 * @param query - Original text to be processed
 * @param whitespace_mode - Whitespace line processing mode, optional values: preserve/remove/collapse
 * @param comment_rules - Comment rule dictionary
 * @returns after process str
 */
function cleanQuery(
    query: string,
    whitespace_mode: "preserve" | "remove" | "collapse" = "collapse",
    comment_rules: {
        line_comment?: string[];
        block_comment?: [string, string][];
    } | null = null
): string {}