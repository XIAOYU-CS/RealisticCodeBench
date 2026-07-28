function findCommonColumns(directory) {
    const fsLocal = require('fs');
    const pathLocal = require('path');
    const csvFiles = fsLocal.readdirSync(directory).filter(file => file.endsWith('.csv'));
    if (csvFiles.length === 0) {
        return [];
    }

    const headerSets = csvFiles.map(file => {
        const firstLine = fsLocal.readFileSync(pathLocal.join(directory, file), 'utf8').split(/\r?\n/)[0];
        return new Set(firstLine.split(',').map(column => column.trim()));
    });

    let commonColumns = [...headerSets[0]];
    for (const headers of headerSets.slice(1)) {
        commonColumns = commonColumns.filter(column => headers.has(column));
    }
    return commonColumns;
}
