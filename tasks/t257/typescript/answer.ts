const fsForByteRead = require("fs");

function readFileToByteArray(filePath: string): Uint8Array {
    if (!fsForByteRead.existsSync(filePath)) {
        throw new Error(`File does not exist: ${filePath}`);
    }
    return fsForByteRead.readFileSync(filePath);
}
