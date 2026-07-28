function tsvToJSONL(tsvFile, jsonlFile) {
  try {
    const fs = require('fs');
    // Read TSV file content
    const tsvContent = fs.readFileSync(tsvFile, 'utf8').trim();

    // Convert TSV to JSON
    const lines = tsvContent ? tsvContent.split(/\r?\n/) : [];
    const headers = lines.shift()?.split('\t') || [];
    const jsonData = lines.map(line => {
      const values = line.split('\t');
      return headers.reduce((row, header, index) => {
        row[header] = parseValue(values[index]);
        return row;
      }, {});
    });

    // Convert JSON to JSONL format
    const jsonlContent = jsonData.map(JSON.stringify).join('\n');

    // Write JSONL content to file
    fs.writeFileSync(jsonlFile, jsonlContent ? `${jsonlContent}\n` : '', 'utf8');

    console.log(`Successfully converted ${tsvFile} to ${jsonlFile}`);
  } catch (error) {
    console.error('Error converting TSV to JSONL:', error);
  }
}

function parseValue(value) {
  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }
  if (value === 'True') return true;
  if (value === 'False') return false;
  return value;
}
