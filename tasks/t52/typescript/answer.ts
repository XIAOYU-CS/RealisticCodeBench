type Row = Record<string, unknown>;

function fillMissingWithFirstValid(df: Row[], columnName: string): Row[] {
    if (!Array.isArray(df)) {
        throw new Error('DataFrame must be an array of records.');
    }
    if (!df.some(row => Object.prototype.hasOwnProperty.call(row, columnName))) {
        throw new Error(`Column '${columnName}' does not exist in the DataFrame.`);
    }

    const firstValid = df.find(row => row[columnName] !== null && row[columnName] !== undefined)?.[columnName] ?? null;
    return df.map(row => ({
        ...row,
        [columnName]: row[columnName] === null || row[columnName] === undefined ? firstValid : row[columnName],
    }));
}
