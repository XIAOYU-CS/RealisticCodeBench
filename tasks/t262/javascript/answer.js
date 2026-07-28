const fsJson = require("fs");

function parseJsonFile(filePath) {
    return JSON.parse(fsJson.readFileSync(filePath, "utf8"));
}
