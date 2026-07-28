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
 * @returns {ColumnDetail[]} - An array of column detail objects.
 *
 * @example
 * const csv = `Name,Age,Active\n"Alice, Jr.",25,"true"\nBob,30,false`;
 * const details = getColumnDetails(csv);
 */
interface ColumnDetail {
  columnName: string;
  dataType: 'string' | 'number' | 'boolean' | 'mixed' | 'empty';
  sampleValues: string[];
  totalCount: number;
  emptyCount: number;
  nonEmptyCount: number;
}

function getColumnDetails(csvData: string): ColumnDetail[] {
  /**
   * Parses a single CSV line into an array of fields, respecting quotes and escaping.
   * Handles:
   * - Quoted fields: "hello, world"
   * - Escaped quotes: "a""b" becomes a"b
   * - Unquoted fields
   *
   * @param {string} line - A single line of CSV text.
   * @returns {string[]} - Array of parsed fields.
   */
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let inQuotes = false;
    let currentCell = '';
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      const nextChar = i + 1 < line.length ? line[i + 1] : null;

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Found two consecutive quotes inside a quoted field: treat as escaped quote
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

    // Trim whitespace from each field
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
  const columnDetails: ColumnDetail[] = header.map((columnName, columnIndex) => {
    const cleanColumnName = columnName.trim();
    const columnValues = dataRows.map(row => {
      // Handle missing columns in row
      return row[columnIndex] !== undefined ? row[columnIndex] : '';
    });

    const totalCount = columnValues.length;
    const emptyCount = columnValues.filter(val => val === '').length;
    const nonEmptyValues = columnValues.filter(val => val !== '');
    const sampleValues = nonEmptyValues.slice(0, 5); // Up to 5 non-empty samples

    let dataType: 'string' | 'number' | 'boolean' | 'mixed' | 'empty' = 'empty';

    if (nonEmptyValues.length === 0) {
      dataType = 'empty';
    } else {
      const isNumber = nonEmptyValues.every(val => /^-?\d+(?:\.\d+)?$/.test(val));
      const isBoolean = nonEmptyValues.every(val => /^(true|false)$/i.test(val));

      if (isNumber) {
        dataType = 'number';
      } else if (isBoolean) {
        dataType = 'boolean';
      } else {
        // Check if it contains numbers among strings → mixed
        const hasNumbers = nonEmptyValues.some(val => /^-?\d+(?:\.\d+)?$/.test(val));
        dataType = hasNumbers ? 'mixed' : 'string';
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