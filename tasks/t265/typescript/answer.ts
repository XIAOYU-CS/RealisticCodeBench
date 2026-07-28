const fsForLineModify = require("fs");

function modifyLineInFile(filePath: string, lineNumber: number, newValue: string): void {
    const lines = fsForLineModify.readFileSync(filePath, "utf8").split("\n");
    if (lines.length > 0 && lines[lines.length - 1] === "") {
        lines.pop();
    }
    if (lineNumber < 1 || lineNumber > lines.length) {
        throw new Error(`Invalid line number: ${lineNumber}`);
    }
    lines[lineNumber - 1] = newValue;
    fsForLineModify.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}
