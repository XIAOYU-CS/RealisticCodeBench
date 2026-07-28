const fs = require('fs')

class DataFrame {
    rows: any[];

    constructor(rows: any[] = []) {
        this.rows = rows;
    }

    equals(other: DataFrame): boolean {
        const normalize = (rows: any[]) => rows.map(row => Object.fromEntries(Object.keys(row).sort().map(key => [key, row[key]])));
        return JSON.stringify(normalize(this.rows)) === JSON.stringify(normalize(other.rows));
    }
}

/**
 * Convert an XML file into a 2D array representing a DataFrame. Each <sequence> tag is treated as a row,
 * and each sub-element within <sequence> is treated as a column.
 *
 * Args:
 * xmlFile (string): Path to the XML file.
 *
 * Returns:
 * any[][]: 2D array representing the DataFrame containing the data from the XML file.
 */
function xmlToDataFrame(xmlFile: string): DataFrame {
    const xmlContent = fs.existsSync(xmlFile) ? fs.readFileSync(xmlFile, 'utf-8') : xmlFile;

    const rows: any[] = [];
    const columns: string[] = [];

    for (const match of xmlContent.matchAll(/<sequence>([\s\S]*?)<\/sequence>|<sequence\s*\/>/g)) {
        const rowData: any = {};
        const sequence = match[1] || '';
        for (const child of sequence.matchAll(/<(\w+)>([\s\S]*?)<\/\1>/g)) {
            rowData[child[1]] = child[2];
            if (!columns.includes(child[1])) {
                columns.push(child[1]);
            }
        }
        rows.push(rowData);
    }

    rows.forEach(row => {
        columns.forEach(column => {
            if (!(column in row)) {
                row[column] = null;
            }
        });
    });
  
    return new DataFrame(rows);
  }
