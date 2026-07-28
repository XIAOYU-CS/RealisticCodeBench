/** @jest-environment jsdom */
function extractCssFromStylesheet(sheet) {
    if (typeof CSSStyleSheet === 'undefined' || !(sheet instanceof CSSStyleSheet)) {
        return '';
    }

    try {
        return Array.from(sheet.cssRules || [])
            .map(rule => rule.cssText)
            .join('');
    } catch {
        return '';
    }
}
