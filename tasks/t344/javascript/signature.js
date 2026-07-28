/**
 * Split HTML string into tag blocks and non-tag text blocks by specified tags
 *
 * @param {string} html - String containing HTML content
 * @param {string[]|null} [targetTags=null] - List of tags to match, e.g. ["div", "span"], defaults to handling p, ul, ol
 * @param {boolean} [preserveWhitespace=false] - Whether to preserve whitespace characters, false to automatically strip leading/trailing whitespace
 * @returns {string[]} List of split content arranged in original order
 */
function splitHtmlContent(html, targetTags = null, preserveWhitespace = false) {}