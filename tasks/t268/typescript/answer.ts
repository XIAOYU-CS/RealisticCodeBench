async function readCsv(filePath: string): Promise<string[][]> {
    const nodeFs = require('fs') as typeof import('fs');
    const content = nodeFs.readFileSync(filePath, 'utf8');
    const rows: string[][] = [];
    let row: string[] = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
        const ch = content[i];
        if (inQuotes) {
            if (ch === '"') {
                if (content[i + 1] === '"') {
                    field += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += ch;
            }
        } else if (ch === '"') {
            inQuotes = true;
        } else if (ch === ',') {
            row.push(field);
            field = '';
        } else if (ch === '\n') {
            row.push(field);
            rows.push(row);
            row = [];
            field = '';
        } else if (ch !== '\r') {
            field += ch;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }
    return rows;
}
