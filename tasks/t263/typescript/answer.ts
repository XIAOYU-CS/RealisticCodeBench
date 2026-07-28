const fsForDataRead = require("fs");

function readDataFromFile(path: string): (number | string)[] {
    const content = fsForDataRead.readFileSync(path, "utf8");
    const result: (number | string)[] = [];

    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (line === "") {
            continue;
        }
        if (/^[+-]?\d+$/.test(line)) {
            result.push(Number.parseInt(line, 10));
        } else if (/^[+-]?(?:\d+\.\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(line) || /^[+-]?\d+[eE][+-]?\d+$/.test(line)) {
            result.push(Number.parseFloat(line));
        } else {
            result.push(line);
        }
    }

    return result;
}
