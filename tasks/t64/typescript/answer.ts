function readRows(fileHandler: any, reader: any): string[][] {
  if (reader && typeof reader.readAll === 'function') {
    return reader.readAll();
  }

  const content = String(fileHandler && fileHandler.content || '');
  return content.trim().split(/\r?\n/).filter(Boolean).map((line) => line.split(','));
}

function sameFirstThree(row: string[], candidate: string[]): boolean {
  const rowPrefix = row.slice(0, 3);
  const candidatePrefix = candidate.slice(0, 3);
  return rowPrefix.length === candidatePrefix.length
    && rowPrefix.every((value, index) => value === candidatePrefix[index]);
}

function appendOrSkipRow(fileHandler: any, reader: any, rowCandidate: string[]): void {
  if (readRows(fileHandler, reader).some((row) => sameFirstThree(row, rowCandidate))) {
    return;
  }

  const prefix = fileHandler.content && !fileHandler.content.endsWith('\n') ? '\n' : '';
  fileHandler.write(`${prefix}${rowCandidate.join(',')}\n`);
}
