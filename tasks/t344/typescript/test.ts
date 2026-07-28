describe('splitHtmlContent', () => {
    test('basic html splitting', () => {
        const html = "<p>Hello</p>World<ul><li>Item1</li></ul>";
        const result = splitHtmlContent(html);
        const expected = ["<p>Hello</p>", "World", "<ul><li>Item1</li></ul>"];
        expect(result).toEqual(expected);
    });

    test('custom target tags', () => {
        const html = "<div>Content</div><span>Text</span>End";
        const result = splitHtmlContent(html, ['div', 'span']);
        const expected = ["<div>Content</div>", "<span>Text</span>", "End"];
        expect(result).toEqual(expected);
    });

    test('preserve whitespace mode', () => {
        const html = "  Start  <p>  Content  </p>  End  ";
        const result = splitHtmlContent(html, null, true);
        const expected = ["  Start  ", "<p>  Content  </p>", "  End  "];
        expect(result).toEqual(expected);
    });

    test('strip whitespace mode', () => {
        const html = "  Start  <p>  Content  </p>  End  ";
        const result = splitHtmlContent(html, null, false);
        const expected = ["Start", "<p>  Content  </p>", "End"];
        expect(result).toEqual(expected);
    });

    test('tags with attributes', () => {
        const html = 'Text<div class="container" id="main">Content</div>End';
        const result = splitHtmlContent(html, ['div']);
        const expected = ["Text", '<div class="container" id="main">Content</div>', "End"];
        expect(result).toEqual(expected);
    });


    test('no matching tags', () => {
        const html = "Just plain text without any target tags";
        const result = splitHtmlContent(html, ['div', 'span']);
        const expected = ["Just plain text without any target tags"];
        expect(result).toEqual(expected);
    });
});