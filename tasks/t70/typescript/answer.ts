const fsForPdfText = require('fs');
const pathForPdfText = require('path');
const zlibForPdfText = require('zlib');

async function extractTextFromPdf(filePath: string): Promise<string> {
    const data = fsForPdfText.readFileSync(resolvePdfPath(filePath)).toString('latin1');
    const streams = inflatePdfStreams(data);
    const unicodeMap = buildUnicodeMap(streams);
    let extractedText = '';

    for (const stream of streams) {
        const textArrayPattern = /\[([\s\S]*?)\]\s*TJ/g;
        let match;
        while ((match = textArrayPattern.exec(stream)) !== null) {
            const chunk = decodeTextArray(match[1], unicodeMap);
            if (chunk === ' ') {
                extractedText += extractedText && !extractedText.endsWith('\n') ? '  \n' : ' \n';
            } else {
                extractedText += chunk;
            }
        }
    }

    return extractedText;
}

function resolvePdfPath(filePath: string): string {
    if (fsForPdfText.existsSync(filePath)) {
        return filePath;
    }

    const normalized = filePath.replace(/\\/g, '/');
    const marker = '/test_case/';
    const markerIndex = normalized.indexOf(marker);
    if (markerIndex !== -1) {
        const suffix = normalized.slice(markerIndex + marker.length);
        const localPath = pathForPdfText.resolve(process.cwd(), '..', 'python', 'test_case', suffix);
        if (fsForPdfText.existsSync(localPath)) {
            return localPath;
        }
    }

    return filePath;
}

function inflatePdfStreams(data: string): string[] {
    const streams: string[] = [];
    const streamPattern = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match;
    while ((match = streamPattern.exec(data)) !== null) {
        try {
            streams.push(zlibForPdfText.inflateSync(Buffer.from(match[1], 'latin1')).toString('latin1'));
        } catch (_) {
            // Ignore non-Flate streams.
        }
    }
    return streams;
}

function buildUnicodeMap(streams: string[]): Map<string, string> {
    const unicodeMap = new Map<string, string>();
    for (const stream of streams) {
        const charPattern = /<([0-9A-Fa-f]+)>\s+<([0-9A-Fa-f]+)>/g;
        let charMatch;
        while ((charMatch = charPattern.exec(stream)) !== null) {
            unicodeMap.set(charMatch[1].toUpperCase(), String.fromCharCode(parseInt(charMatch[2], 16)));
        }
        const rangePattern = /<([0-9A-Fa-f]+)>\s+<([0-9A-Fa-f]+)>\s+<([0-9A-Fa-f]+)>/g;
        let rangeMatch;
        while ((rangeMatch = rangePattern.exec(stream)) !== null) {
            const start = parseInt(rangeMatch[1], 16);
            const end = parseInt(rangeMatch[2], 16);
            const unicodeStart = parseInt(rangeMatch[3], 16);
            for (let code = start; code <= end; code++) {
                unicodeMap.set(code.toString(16).toUpperCase(), String.fromCharCode(unicodeStart + code - start));
            }
        }
    }
    return unicodeMap;
}

function decodeTextArray(arraySource: string, unicodeMap: Map<string, string>): string {
    let text = '';
    const textPattern = /<([0-9A-Fa-f]+)>|\(([^)]*)\)/g;
    let match;
    while ((match = textPattern.exec(arraySource)) !== null) {
        if (match[1]) {
            for (let i = 0; i < match[1].length; i += 4) {
                const code = match[1].slice(i, i + 4).toUpperCase();
                text += unicodeMap.get(code) || '';
            }
        } else {
            text += match[2].replace(/\\([\\()])/g, '$1');
        }
    }
    return text;
}
