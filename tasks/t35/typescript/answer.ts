function csvToSqlInsert(csvFilePath: string): string {
    const fsLocal = require('fs');
    const pathLocal = require('path');

    // Extract the table name from the CSV file name, removing the suffix
    const tableName = pathLocal.basename(csvFilePath, pathLocal.extname(csvFilePath));
    const lines = fsLocal.readFileSync(csvFilePath, 'utf8').trim().split(/\r?\n/);
    if (lines.length <= 1) {
        return '';
    }
    const headers = parseCsvLine(lines[0]);

    return lines.slice(1).map(line => {
        const values = parseCsvLine(line).map(value => `'${value.replace(/'/g, "''")}'`);
        return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES (${values.join(', ')});`;
    }).join('\n');
}

function parseCsvLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && line[i + 1] === '"') {
            current += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}
