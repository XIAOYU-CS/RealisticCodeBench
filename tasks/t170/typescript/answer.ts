function minifyHtml(html: string): string {
    const blocks: string[] = [];
    const token = (index: number): string => `\uE000HTML_BLOCK_${index}\uE000`;

    html = html.replace(/<(pre|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (block: string): string => {
        const key = token(blocks.length);
        blocks.push(block);
        return key;
    });

    html = html
        .trim()
        .replace(/[ \t]*\r?\n+[ \t]*/g, '\u0001')
        .replace(/[ \t]+/g, ' ')
        .replace(/<[^>]+>/g, (tag: string): string => tag.replace(/\s+/g, ' ').replace(/\s+>/g, '>'))
        .replace(/>\s+</g, '><')
        .replace(/(<[^/!][^>]*>) (?=[^<])/g, '$1')
        .replace(/([^>\s]) (<\/[^>]+>)/g, '$1$2')
        .replace(/\u0001/g, ' ');

    blocks.forEach((block: string, index: number): void => {
        html = html.replace(token(index), block);
    });

    return html;
}
