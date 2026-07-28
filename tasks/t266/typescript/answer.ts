const fsForCsvWrite = require("fs");

function writeCsvToFile(strings: string[], filePath: string): void {
    fsForCsvWrite.writeFileSync(filePath, strings.join(","), "utf8");
}
