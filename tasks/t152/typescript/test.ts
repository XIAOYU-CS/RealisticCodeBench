describe('extractCssFromStylesheet', () => {
    let styleSheet;

    beforeEach(() => {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(`
            body { background-color: red; }
            p { color: blue; }
        `));
        document.head.appendChild(style);
        styleSheet = style.sheet;
    });

    afterEach(() => {
        document.head.innerHTML = '';
    });


    test('Empty Stylesheet: should return an empty string', () => {
        const emptyStyle = document.createElement('style');
        document.head.appendChild(emptyStyle);
        const emptyStyleSheet = emptyStyle.sheet;

        const cssText = extractCssFromStylesheet(emptyStyleSheet);
        expect(cssText).toBe('');
    });

    test('Invalid Input: should return an empty string for non-CSSStyleSheet input', () => {
        expect(extractCssFromStylesheet(null)).toBe('');
        expect(extractCssFromStylesheet({})).toBe('');
        expect(extractCssFromStylesheet('not a stylesheet')).toBe('');
    });

    test('Cross-Origin Restrictions: should handle restricted stylesheets gracefully', () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://example.com/style.css';
        document.head.appendChild(link);

        const restrictedSheet = link.sheet;

        expect(() => {
            extractCssFromStylesheet(restrictedSheet);
        }).not.toThrow();

        const cssText = extractCssFromStylesheet(restrictedSheet);
        expect(cssText).toBe('');
    });

    test('Style Element with Inline CSS: should return CSS from inline style element', () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = 'div { font-size: 16px; }';
        document.head.appendChild(styleElement);

        const cssText = extractCssFromStylesheet(styleElement.sheet);
        expect(cssText).toBe('div {font-size: 16px;}');
    });

    test('Multiple CSS Rules: should concatenate CSS from an existing stylesheet', () => {
        const cssText = extractCssFromStylesheet(styleSheet);
        expect(cssText).toBe('body {background-color: red;}p {color: blue;}');
    });
});
