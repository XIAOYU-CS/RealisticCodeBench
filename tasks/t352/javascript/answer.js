/**
 * Parses CSV data and returns detailed information about each column,
 * including column name, inferred data type, and sample values.
 *
 * Supports standard CSV formatting:
 * - Fields may be quoted with double quotes
 * - Commas within quoted fields are preserved
 * - Double double-quotes inside quotes are treated as escaped quote (e.g., "a""b" → a"b)
 *
 * @param {string} csvData - The raw CSV string to parse.
 * @returns {Array<{ columnName: string, dataType: 'string' | 'number' | 'boolean' | 'mixed' | 'empty', sampleValues: string[], totalCount: number, emptyCount: number }>}
 *   An array of column detail objects.
 */
function getColumnDetails(csvData) {
  const parseCSVLine = (line) => {
    const result = [];
    let inQuotes = false;
    let currentCell = '';
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      const nextChar = i + 1 < line.length ? line[i + 1] : null;

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Found two consecutive quotes: treat as escaped quote
          currentCell += '"';
          i += 2; // Skip both quotes
          continue;
        } else {
          // Toggle quote mode
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        // Only split on commas outside quotes
        result.push(currentCell);
        currentCell = '';
        i++;
      } else {
        currentCell += char;
        i++;
      }
    }

    // Push the last field
    result.push(currentCell);

    // Trim whitespace from each field unless it's quoted (but we already unquoted)
    return result.map(field => field.trim());
  };

  // Preprocess and split lines
  const lines = csvData.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
  if (lines.length === 0) {
    return [];
  }

  // Parse header
  const header = parseCSVLine(lines[0]);
  const dataRows = lines.slice(1).map(line => parseCSVLine(line));

  // Analyze each column
  const columnDetails = header.map((columnName, columnIndex) => {
    const cleanColumnName = columnName.trim();
    const columnValues = dataRows.map(row => {
      // Handle missing columns in row
      return row[columnIndex] !== undefined ? row[columnIndex].trim() : '';
    });

    // Count total and empty values
    const totalCount = columnValues.length;
    const emptyCount = columnValues.filter(val => val === '' || val === null || val === undefined).length;

    // Get non-empty samples (up to 5)
    const sampleValues = columnValues
      .filter(val => val !== '')
      .slice(0, 5);

    // Infer data type
    let dataType = 'string';
    const nonEmptyValues = columnValues.filter(val => val !== '');

    if (nonEmptyValues.length === 0) {
      dataType = 'empty';
    } else {
      const isNumber = nonEmptyValues.every(val => /^-?\d+(\.\d+)?$/.test(val));
      const isBoolean = nonEmptyValues.every(val => /^(true|false)$/i.test(val));

      if (isNumber) {
        dataType = 'number';
      } else if (isBoolean) {
        dataType = 'boolean';
      } else {
        dataType = 'string';
      }

      // If mixed types are found, mark as mixed
      if (!isNumber && !isBoolean && nonEmptyValues.some(val => /^-?\d+(\.\d+)?$/.test(val))) {
        dataType = 'mixed';
      }
    }

    return {
      columnName: cleanColumnName,
      dataType,
      sampleValues,
      totalCount,
      emptyCount,
      nonEmptyCount: totalCount - emptyCount
    };
  });

  console.log("Column Details:", columnDetails);
  return columnDetails;
}