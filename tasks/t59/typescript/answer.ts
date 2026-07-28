function tsvToJsonl(tsvFile: string, jsonlFile: string): void {
    /**
     * Convert tsv file to jsonl file
     *
     * @param tsvFile - Path to the TSV file
     * @param jsonlFile - Path to the JSONL file
     */
    const content = fs.readFileSync(tsvFile, 'utf8').trim();
    const lines = content ? content.split(/\r?\n/) : [];
    const headers = (lines.shift() || '').split('\t');
    const jsonl = lines.map(line => {
        const values = line.split('\t');
        return JSON.stringify(headers.reduce((row, header, index) => {
            row[header] = parseValue(values[index]);
            return row;
        }, {} as Record<string, string | number | boolean>));
    }).join('\n');

    fs.writeFileSync(jsonlFile, jsonl ? `${jsonl}\n` : '', 'utf8');
}

function parseValue(value: string): string | number | boolean {
    if (/^-?\d+(?:\.\d+)?$/.test(value)) {
        return Number(value);
    }
    if (value === 'True') return true;
    if (value === 'False') return false;
    return value;
}
