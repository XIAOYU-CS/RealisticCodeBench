/**
 * Split HTML string into tag blocks and non-tag text blocks by specified tags
 *
 * @param html - String containing HTML content
 * @param targetTags - List of tags to match, e.g. ["div", "span"], defaults to handling p, ul, ol
 * @param preserveWhitespace - Whether to preserve whitespace characters, false to automatically strip leading/trailing whitespace
 * @returns List of split content arranged in original order
 */
function splitHtmlContent(
    html: string,
    targetTags: string[] | null = null,
    preserveWhitespace: boolean = false
): string[] {}