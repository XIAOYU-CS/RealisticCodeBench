const HTML_ENTITIES: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: '\u00a0',
};

/**
 * Decodes HTML entities in a given HTML string.
 * @param {string} htmlString - The HTML string containing entities to decode.
 * @returns {string} The decoded string with HTML entities converted back to their original characters.
 */
function decodeHtmlEntities(htmlString: string): string {
    if (typeof htmlString !== 'string') {
        throw new TypeError('Input must be a string.');
    }

    return htmlString.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]+);/g, (match: string, entity: string): string => {
        if (entity[0] === '#') {
            const radix = entity[1].toLowerCase() === 'x' ? 16 : 10;
            const value = Number.parseInt(entity.slice(radix === 16 ? 2 : 1), radix);
            return Number.isFinite(value) && value <= 0x10ffff ? String.fromCodePoint(value) : match;
        }

        return Object.prototype.hasOwnProperty.call(HTML_ENTITIES, entity) ? HTML_ENTITIES[entity] : match;
    });
}
