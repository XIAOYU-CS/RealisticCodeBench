/**
 * Format text as comments with specified style, supporting custom line prefixes
 *
 * @param {string} string - Original text to be formatted
 * @param {number} [max_length=60] - Maximum length per line (including comment symbols and prefixes)
 * @param {"hash"|"slash"|"block"} [comment_style="hash"] - Comment style
 * @param {string} [line_prefix=""] - Extra prefix before each comment content (such as "[NOTE] ")
 * @returns {string} Formatted comment string
 */
function formatCommentWithCustomStyle(string, max_length = 60, comment_style = "hash", line_prefix = "") {}