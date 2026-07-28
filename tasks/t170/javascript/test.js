describe('minifyHtml', () => {
    test('should remove leading and trailing spaces around tags', () => {
        const input = '  <div>  <p>Test</p>  </div>  ';
        const expected = '<div><p>Test</p></div>';
        expect(minifyHtml(input)).toBe(expected);
    });

    test('should replace multiple newlines with a single space', () => {
        const input = '<div>\n\n<p>Test</p>\n\n</div>';
        const expected = '<div> <p>Test</p> </div>';
        expect(minifyHtml(input)).toBe(expected);
    });

    test('should remove unnecessary spaces within text', () => {
        const input = '<p>This    is a test</p>';
        const expected = '<p>This is a test</p>';
        expect(minifyHtml(input)).toBe(expected);
    });

    test('should handle empty strings', () => {
        const input = '';
        const expected = '';
        expect(minifyHtml(input)).toBe(expected);
    });

    test('should process complex nested HTML correctly', () => {
        const input = '<div>   <span>    Text <i>    Italic </i> more text </span>   </div>';
        const expected = '<div><span>Text <i>Italic</i> more text</span></div>';
        expect(minifyHtml(input)).toBe(expected);
    });

    test('should not disrupt content within <pre> and <textarea> tags', () => {
        const input = '<pre>\n    function example() {\n        console.log("example");\n    }\n</pre>';
        const expected = '<pre>\n    function example() {\n        console.log("example");\n    }\n</pre>'; // assuming no changes in <pre> and <textarea>
        expect(minifyHtml(input)).toBe(expected);
    });

    test('should handle HTML with attributes correctly', () => {
        const input = '<a href="http://example.com"    title="Example" >Link</a>';
        const expected = '<a href="http://example.com" title="Example">Link</a>';
        expect(minifyHtml(input)).toBe(expected);
    });
});