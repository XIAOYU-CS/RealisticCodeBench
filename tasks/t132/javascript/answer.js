let stdinText = '';

process.stdin.on('data', chunk => {
    stdinText += chunk.toString();
});

function parseTSV(text) {
    if (!text) {
        return [];
    }

    const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    if (lines[lines.length - 1] === '') {
        lines.pop();
    }

    const rows = lines.map(line => line === '' ? [] : line.split('\t'));
    const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
    return rows.map(row => row.concat(Array(maxColumns - row.length).fill('')));
}

function readTSVFromStdin() {
    let text = stdinText;
    stdinText = '';

    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        text += chunk.toString();
    }

    return parseTSV(text);
}
