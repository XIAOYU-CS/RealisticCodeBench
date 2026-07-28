/** @jest-environment jsdom */
function extractCssFromStylesheet(sheet: unknown): string {
    if (typeof CSSStyleSheet === 'undefined' || !(sheet instanceof CSSStyleSheet)) {
        return '';
    }

    try {
        return Array.from(sheet.cssRules || [])
            .map((rule: CSSRule) => rule.cssText)
            .join('');
    } catch {
        return '';
    }
}
