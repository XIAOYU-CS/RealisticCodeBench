const fs = require('fs');

function dataframeToMarkdown(data, mdPath) {
    const { columns, rows } = normalizeDataFrame(data);
    const markdown = formatMarkdown(columns, rows);

    fs.writeFileSync(mdPath, markdown);
    return markdown;
}

function normalizeDataFrame(data) {
    if (Array.isArray(data)) {
        const columns = data.length ? Object.keys(data[0]) : [];
        return { columns, rows: data.map(row => columns.map(column => row[column])) };
    }
    if (data instanceof Map) {
        const columns = Array.from(data.keys());
        const rowCount = Math.max(0, ...columns.map(column => data.get(column).length));
        const rows = Array.from({ length: rowCount }, (_, index) => columns.map(column => data.get(column)[index]));
        return { columns, rows };
    }
    if (data && typeof data === 'object') {
        const columns = Object.keys(data);
        const rowCount = Math.max(0, ...columns.map(column => Array.isArray(data[column]) ? data[column].length : 1));
        const rows = Array.from({ length: rowCount }, (_, index) => columns.map(column => Array.isArray(data[column]) ? data[column][index] : data[column]));
        return { columns, rows };
    }
    return { columns: [], rows: [] };
}

function formatMarkdown(columns, rows) {
    if (columns.length === 0) {
        return "";
    }

    const numeric = columns.map((_, index) => rows.length > 0 && rows.every(row => isNumeric(row[index])));
    const rawValues = rows.map(row => row.map((value, index) => formatValue(value, numeric[index])));
    const decimalColumns = columns.map((_, index) => numeric[index] && rawValues.some(row => row[index].includes(".")));
    const maxValueLengths = columns.map((_, index) => Math.max(0, ...rawValues.map(row => row[index].length)));
    const values = rawValues.map(row => row.map((value, index) => {
        return decimalColumns[index] ? value.padEnd(maxValueLengths[index]) : value;
    }));
    const widths = columns.map((column, index) => Math.max(
        String(column).length + 4,
        ...values.map(row => row[index].length + 2)
    ));

    const lines = [
        rowToMarkdown(columns.map(String), widths, numeric),
        separatorToMarkdown(widths, numeric),
        ...values.map(row => rowToMarkdown(row, widths, numeric))
    ];
    return lines.join("\n");
}

function rowToMarkdown(row, widths, numeric) {
    return "|" + row.map((value, index) => {
        if (numeric[index]) {
            return value.padStart(widths[index] - 1) + " ";
        }
        return " " + value.padEnd(widths[index] - 1);
    }).join("|") + "|";
}

function separatorToMarkdown(widths, numeric) {
    return "|" + widths.map((width, index) => {
        return numeric[index] ? "-".repeat(width - 1) + ":" : ":" + "-".repeat(width - 1);
    }).join("|") + "|";
}

function isNumeric(value) {
    if (value === null || value === undefined || value === "") {
        return false;
    }
    return Number.isFinite(Number(value));
}

function formatValue(value, numeric) {
    if (value === null || value === undefined) {
        return "";
    }
    if (numeric && isNumeric(value)) {
        const number = Number(value);
        return Number.isInteger(number) ? String(number) : String(number);
    }
    return String(value);
}
