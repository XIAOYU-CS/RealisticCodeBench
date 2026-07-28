const nodeFs = require("fs");
const nodeIconv = require("iconv-lite");

function normalizeEncoding(encoding: string): string {
    return encoding.replace("_", "").toLowerCase() === "utf16" ? "utf16" : encoding;
}

function convertEncoding(
  inputFilePath: string,
  outputFilePath: string,
  originalEncoding: string = "cp932",
  targetEncoding: string = "utf16"
): boolean {
    const sourceEncoding = normalizeEncoding(originalEncoding);
    const destinationEncoding = normalizeEncoding(targetEncoding);

    try {
        const raw = nodeFs.readFileSync(inputFilePath);
        const content = nodeIconv.decode(raw, sourceEncoding);
        nodeFs.writeFileSync(outputFilePath, nodeIconv.encode(content, destinationEncoding));
        return true;
    } catch (error) {
        try {
            const raw = nodeFs.readFileSync(inputFilePath);
            nodeIconv.decode(raw, destinationEncoding);
            nodeFs.copyFileSync(inputFilePath, outputFilePath);
            return true;
        } catch {
            return false;
        }
    }
}
