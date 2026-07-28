const fs = require('fs');

async function readCsv(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const rows = [];
    let row = [];
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
