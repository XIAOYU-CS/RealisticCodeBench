const fsJson = require("fs");

function parseJsonFile(filePath: string): Record<string, unknown> {
    return JSON.parse(fsJson.readFileSync(filePath, "utf8"));
}
