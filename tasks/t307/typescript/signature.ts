/**
 * Format text as comments with specified style, supporting custom line prefixes
 *
 * @param string - Original text to be formatted
 * @param maxLength - Maximum length per line (including comment symbols and prefixes)
 * @param commentStyle - Comment style, optional values: 'hash', 'slash', 'block'
 * @param linePrefix - Extra prefix before each comment content (such as "[NOTE] ")
 * @returns Formatted comment string
 */
function formatComment(
    string: string,
    maxLength: number = 60,
    commentStyle: 'hash' | 'slash' | 'block' = 'hash',
    linePrefix: string = ''
): string {}