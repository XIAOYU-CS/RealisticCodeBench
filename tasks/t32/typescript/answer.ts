import * as fs from 'fs';
import * as path from 'path';

function findCommonColumns(directory: string): string[] {
  const csvFiles = fs.readdirSync(directory).filter((file) => file.endsWith('.csv'));
  if (csvFiles.length === 0) {
    return [];
  }

  let commonColumns = fs
    .readFileSync(path.join(directory, csvFiles[0]), 'utf8')
    .split(/\r?\n/)[0]
    .split(',')
    .map((column) => column.trim());

  for (const file of csvFiles.slice(1)) {
    const columns = new Set(
      fs
        .readFileSync(path.join(directory, file), 'utf8')
        .split(/\r?\n/)[0]
        .split(',')
        .map((column) => column.trim())
    );
    commonColumns = commonColumns.filter((column) => columns.has(column));
  }

  return commonColumns;
}
